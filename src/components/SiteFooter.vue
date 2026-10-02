<script setup>
import SocialLinks from './SocialLinks.vue';
import { EMAIL, DEV_CREDIT } from '../config';
</script>

<template>
  <footer class="bottom-info">
    <div class="bottom-left">
      <SocialLinks />

      <h2 class="email-link">
        <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
      </h2>
    </div>

    <small class="dev-by">{{ DEV_CREDIT }}</small>
  </footer>
</template>

<style scoped>
.bottom-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.bottom-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
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

.dev-by {
  font-size: 0.75rem;
  opacity: 0.7;
  text-align: right;
}
</style>