<script setup>
import { onMounted, onUnmounted } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { siBehance, siInstagram } from 'simple-icons';

const RING_COUNT = 32;
const SPACING = 1.5;
const TOTAL_DEPTH = RING_COUNT * SPACING; // 48
const START_Z = -44;

let offset = 0;
let boost = 0;
let rafId = null;
const autoSpeed = 0.02; // a bit faster so the motion is clearly visible

const rings = []; // filled via template refs
const setRing = (el, i) => {
  if (el) rings[i] = el.value ?? el;
};

const rectPoints = new Float32Array([
  -8, -5.5, 0, 8, -5.5, 0, 8, 5.5, 0, -8, 5.5, 0,
]);

// Static corner lines, defined once (not inside the template)
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

const openMail = () => {
  window.location.href = 'mailto:ardholakiya004@gmail.com';
};

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: true });
  rafId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  cancelAnimationFrame(rafId);
});

const getZPos = (i) => {
  const rawZ = i * 1.5 - tunnelOffset.value;
  return (((rawZ % TOTAL_DEPTH) + TOTAL_DEPTH) % TOTAL_DEPTH) + START_Z;
};

// Fade rings in at the far end and out right before the camera
const getOpacity = (i) => {
  const z = getZPos(i);
  const nearFade = Math.min(Math.max((4 - z) / 6, 0), 1);
  const farFade = Math.min(Math.max((z - START_Z) / 8, 0), 1);
  return 0.35 * nearFade * farFade;
};
</script>

<template>
  <div class="page-container">
    <!-- Fixed 3D Background Canvas -->
    <div class="canvas-background">
      <TresCanvas window-size>
        <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" />

        <!-- Atmospheric fog to fade distant rings smoothly into absolute black -->
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

    <!-- Fixed Foreground Portfolio Content -->
    <div class="content-overlay">
      <div class="top-info">
        <span class="brand-name">Ayush Dholakiya</span>
      </div>

      <div class="center-content">
        <p class="coming-soon">
          <span class="dot"></span>
          Full website coming soon
        </p>

        <h1>
          Brand Strategy &<br />
          Visual Design
        </h1>
        <p>
          I turn business challenges into clear brand direction, meaningful
          identities, and design systems built to work beyond the surface.
        </p>

        <button class="cta-button" @click="openMail">
          Have a project in mind? &rarr;
        </button>
      </div>

      <div class="bottom-info">
        <div class="bottom-left">
          <div class="social-links">
            <a
              href="http://www.linkedin.com/in/ayushdholakiya"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="#ffffff"
                aria-hidden="true"
              >
                <path
                  d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
                />
              </svg>
            </a>

            <a href="https://www.behance.net/ayush04" aria-label="Behance">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="#ffffff"
                aria-hidden="true"
              >
                <path
                  d="M6.94 11.1s1.9-.2 1.9-2.48C8.84 6.1 7.05 5 4.7 5H0v14h5.06c2.6 0 5.07-1.1 5.07-3.9 0-3.1-3.19-4-3.19-4zM2.9 7.3h1.6c.9 0 1.5.4 1.5 1.3 0 .9-.6 1.3-1.6 1.3H2.9V7.3zm1.9 9.4H2.9v-3.3h2c1.1 0 1.8.5 1.8 1.6 0 1.1-.8 1.7-1.9 1.7zM21.6 9.9c-2.8 0-4.6 2-4.6 4.6 0 2.8 1.7 4.6 4.7 4.6 2.2 0 3.7-1 4.2-2.9h-2.4c-.2.5-.7.9-1.7.9-1.2 0-2-.7-2.1-2h6.4c.2-3.1-1.4-5.2-4.5-5.2zm-2 3.5c.1-1 .8-1.6 1.9-1.6 1 0 1.7.6 1.8 1.6h-3.7zM15.6 6.9h5.7v1.4h-5.7z"
                  transform="scale(.92) translate(0 .5)"
                />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/ayush_d2212?stkn=bnZqcXFlZnUwdTky"
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="#ffffff"
                aria-hidden="true"
              >
                <path
                  d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.3.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
                />
              </svg>
            </a>
          </div>

          <h2 class="email-link">
            <a href="mailto:ardholakiya004@gmail.com"
              >ardholakiya004@gmail.com</a
            >
          </h2>
        </div>

        <small class="dev-by">Dev by Bhavya & Dharmil</small>
      </div>
    </div>
  </div>
</template>

<style>
/* Reset & Fullscreen Lock */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

#app {
  max-width: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.page-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.canvas-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.content-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  text-align: center;
  pointer-events: none;
}

.content-overlay button,
.content-overlay a {
  pointer-events: auto;
}

.top-info,
.center-content,
.bottom-info {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.top-info {
  justify-content: flex-start;
}

.brand-name {
  font-family: serif;
  font-size: 1.5rem;
  letter-spacing: 1px;
  text-transform: none;
}

.center-content {
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.center-content .coming-soon {
  font-size: 0.75rem;
  max-width: none;
  margin: 0 0 10px;
  opacity: 0.7;
}

h1 {
  font-family: serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  font-weight: 400;
  margin: 0;
}

.center-content p {
  font-size: 1rem;
  max-width: 450px;
  opacity: 0.8;
  margin: 0 auto;
}

.cta-button {
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-top: 10px;
}

.cta-button:hover {
  transform: scale(1.05);
}

.bottom-info {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0;
}

.bottom-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
}

.social-links {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  opacity: 0.6;
  transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.social-links a:hover {
  opacity: 1;
  transform: scale(1.3);
}

.social-links svg {
  width: 20px;
  height: 20px;
  display: block;
}

.dev-by {
  font-size: 0.75rem;
  opacity: 0.7;
  text-align: right;
}

.email-link {
  font-family: serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
}

.email-link a {
  position: relative;
  display: inline-block;
  color: inherit;
  text-decoration: none;
  padding-bottom: 4px;
}

.email-link a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.35s ease;
}

.email-link a:hover::after {
  transform: scaleX(1);
}

.coming-soon {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.7;
}

.coming-soon .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.4);
  }
}
</style>
