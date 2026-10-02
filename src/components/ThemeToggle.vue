<script setup>
import { useTheme } from '../composables/useTheme';

const { theme, setTheme } = useTheme();
</script>

<template>
  <div class="theme-toggle" role="group" aria-label="Theme">
    <button
      :class="{ active: theme === 'light' }"
      aria-label="Light mode"
      @click="setTheme('light')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>

    <button
      :class="{ active: theme === 'dark' }"
      aria-label="Dark mode"
      @click="setTheme('dark')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: 999px;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--fg);
  opacity: 0.5;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, opacity 0.3s ease;
}

button:hover {
  opacity: 1;
}

button.active {
  background: var(--fg);
  color: var(--bg);
  opacity: 1;
}

svg {
  width: 16px;
  height: 16px;
}
</style>