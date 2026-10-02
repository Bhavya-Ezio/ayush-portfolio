import { ref, watchEffect } from 'vue';

const stored = localStorage.getItem('theme');
const theme = ref(stored === 'light' ? 'light' : 'dark');

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem('theme', theme.value);
});

export function useTheme() {
  const setTheme = (t) => (theme.value = t);
  return { theme, setTheme };
}