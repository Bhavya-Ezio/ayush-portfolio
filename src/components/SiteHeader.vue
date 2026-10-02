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
  font-family: serif;
  font-size: 1.5rem;
  letter-spacing: 1px;
}
</style>