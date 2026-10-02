<script setup>
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { useTheme } from '../composables/useTheme';

const { theme } = useTheme();
const bgColor = computed(() => (theme.value === 'dark' ? '#000000' : '#ffffff'));
const lineColor = computed(() => (theme.value === 'dark' ? '#ffffff' : '#999999'));

const RING_COUNT = 32;
const SPACING = 1.5;
const TOTAL_DEPTH = RING_COUNT * SPACING;
const START_Z = -44;

let boost = 0;
let extra = 0;
let rafId = null;
const startTime = performance.now();

const rings = [];
const setRing = (el, i) => {
  if (el) rings[i] = el.value ?? el;
};

// Squeeze the tunnel horizontally on narrow screens
const aspect = ref(window.innerWidth / window.innerHeight);
const updateAspect = () => {
  aspect.value = window.innerWidth / window.innerHeight;
};
const tunnelScaleX = computed(() =>
  Math.min(Math.max(aspect.value / 1.45, 0.3), 1)
);

// Speed in units per SECOND (0.02/frame at 60fps = 1.2/sec)
const autoSpeed = 1.2;
let lastTime = performance.now();

const handleWheel = (e) => {
  boost += e.deltaY * 0.0025;
};

// Touch support so scrolling works on phones
let touchY = null;
const handleTouchStart = (e) => {
  touchY = e.touches[0].clientY;
};
const handleTouchMove = (e) => {
  if (touchY === null) return;
  const y = e.touches[0].clientY;
  boost += (touchY - y) * 0.004;
  touchY = y;
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

const animate = (now) => {
  // Frame-rate independent timing (capped so tab switches don't jump)
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  boost *= Math.pow(0.88, dt * 60);
  extra += boost * 60 * dt;

  const offset = ((now - startTime) / 1000) * autoSpeed + extra;

  for (let i = 0; i < rings.length; i++) {
    const ring = rings[i];
    if (!ring) continue;

    const raw = i * SPACING - offset;
    const z = (((raw % TOTAL_DEPTH) + TOTAL_DEPTH) % TOTAL_DEPTH) + START_Z;

    const nearFade = Math.min(Math.max((4 - z) / 6, 0), 1);
    const farFade = Math.min(Math.max((z - START_Z) / 8, 0), 1);

    const ringAlpha = computed(() => (theme.value === 'dark' ? 0.25 : 0.5));
    const cornerAlpha = computed(() => (theme.value === 'dark' ? 0.25 : 0.5));  
    
    ring.position.z = z;
    ring.material.opacity = ringAlpha.value * nearFade * farFade;
  }

  rafId = requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: true });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  window.addEventListener('resize', updateAspect);
  lastTime = performance.now();
  rafId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('resize', updateAspect);
  cancelAnimationFrame(rafId);
});
</script>

<template>
  <div class="canvas-background">
    <TresCanvas window-size :clear-color="bgColor" :dpr="[1, 2]">
  <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" />
  <TresFogExp2 :color="bgColor" :density="0.035" />

      <TresGroup :scale="[tunnelScaleX, 1, 1]">
        <TresLineLoop
          v-for="i in RING_COUNT"
          :key="i"
          :ref="(el) => setRing(el, i - 1)"
        >
          <TresBufferGeometry :position="[rectPoints, 3]" />
          <TresLineBasicMaterial
            :color="lineColor"
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
            :color="lineColor"
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