<script setup>
import { EMAIL } from '../config';

const links = [
  { label: 'LinkedIn', href: 'http://www.linkedin.com/in/ayushdholakiya', icon: 'fi fi-brands-linkedin' },
  { label: 'Behance', href: 'https://www.behance.net/ayush04', icon: 'fi fi-brands-behance' },
  { label: 'Instagram', href: 'https://www.instagram.com/ayush_d2212?stkn=bnZqcXFlZnUwdTky', icon: 'fi fi-brands-instagram' },
];
</script>

<template>
  <div class="social-links">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.href"
      :aria-label="link.label"
      :target="link.external === false ? undefined : '_blank'"
      rel="noopener"
    >
      <i :class="link.icon" aria-hidden="true"></i>
    </a>
  </div>
</template>

<style scoped>
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
  color: var(--fg);
  opacity: 0.6;
  transition:
    opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.social-links a:hover {
  opacity: 1;
  transform: scale(1.3);
}

.social-links i {
  display: block;
  font-size: 20px;
  text-decoration: none;
}
</style>