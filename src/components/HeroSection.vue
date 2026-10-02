<script setup>
import { EMAIL } from '../config';

const openMail = () => {
  window.location.href = `mailto:${EMAIL}`;
};
</script>

<template>
  <section class="center-content">
    <p class="coming-soon">
      <span class="dot"></span>
      Full website coming soon
    </p>

    <h1>
      Brand Strategy &<br />
      Visual Design
    </h1>

    <p class="intro">
      I turn business challenges into clear brand direction, meaningful
      identities, and design systems built to work beyond the surface.
    </p>

    <button class="cta-button" @click="openMail">
      Have a project in mind? &rarr;
    </button>
  </section>
</template>

<style scoped>
.center-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.coming-soon {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.7;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--fg);
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

h1 {
  font-family: serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  font-weight: 400;
  margin: 0;
}

.intro {
  font-size: 1rem;
  max-width: 450px;
  opacity: 0.8;
  margin: 0 auto;
}

.cta-button {
  background: var(--fg);
  color: var(--bg);
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
</style>