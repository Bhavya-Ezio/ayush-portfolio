<script setup>
import { NAME } from '../config';
import ThemeToggle from './ThemeToggle.vue';
</script>

<template>
  <header class="top-info">
    <span class="brand-name">{{ NAME }}</span>
    <ThemeToggle />
  </header>
</template>

<style scoped>
.top-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-name {
  font-family: 'Organetto Ultra Bold Ext', serif;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .brand-name {
    font-size: 0.9rem;
  }
}
</style>