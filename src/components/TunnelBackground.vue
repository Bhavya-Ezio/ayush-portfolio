<script setup>
import { onMounted, onUnmounted } from 'vue';
import { TresCanvas } from '@tresjs/core';

const RING_COUNT = 32;
const SPACING = 1.5;
const TOTAL_DEPTH = RING_COUNT * SPACING;
const START_Z = -44;
const autoSpeed = 0.02;

let offset = 0;
let boost = 0;
let rafId = null;

const rings = [];
const setRing = (el, i) => {
  if (el) rings[i] = el.value ?? el;
};

const rectPoints = new Float32Array([
  -8, -5.5, 0, 8, -5.5, 0, 8, 5.5, 0, -8, 5.5, 0,
]);

const cornerLines = [
  [-8, 5.5],
  [8, 5.5],
  [-8, -5.5],
  [8, -5.5],
].map(([x, y]) => new Float32Array([x, y, -45, x, y, 4]));

const handleWheel = (e) => {
  boost += e.deltaY * 0.0025;
};

const animate = () => {
  offset += autoSpeed + boost;
  boost *= 0.88;

  for (let i = 0; i < rings.length; i++) {
    const ring = rings[i];
    if (!ring) continue;

    const raw = i * SPACING - offset;
    const z = (((raw % TOTAL_DEPTH) + TOTAL_DEPTH) % TOTAL_DEPTH) + START_Z;

    const nearFade = Math.min(Math.max((4 - z) / 6, 0), 1);
    const farFade = Math.min(Math.max((z - START_Z) / 8, 0), 1);

    ring.position.z = z;
    ring.material.opacity = 0.25 * nearFade * farFade;
  }

  rafId = requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: true });
  rafId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  cancelAnimationFrame(rafId);
});
</script>

<template>
  <div class="canvas-background">
    <TresCanvas window-size>
      <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" />
      <TresFogExp2 :color="'#000000'" :density="0.035" />

      <TresGroup>
        <TresLineLoop
          v-for="i in RING_COUNT"
          :key="i"
          :ref="(el) => setRing(el, i - 1)"
        >
          <TresBufferGeometry :position="[rectPoints, 3]" />
          <TresLineBasicMaterial
            color="#ffffff"
            :transparent="true"
            :opacity="0"
            :depth-write="false"
          />
        </TresLineLoop>
      </TresGroup>

      <TresGroup>
        <TresLine v-for="(pts, n) in cornerLines" :key="n">
          <TresBufferGeometry :position="[pts, 3]" />
          <TresLineBasicMaterial
            color="#ffffff"
            :transparent="true"
            :opacity="0.25"
          />
        </TresLine>
      </TresGroup>

      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.canvas-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
</style>