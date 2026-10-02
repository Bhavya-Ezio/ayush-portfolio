<script setup>
const links = [
  {
    label: 'LinkedIn',
    href: 'http://www.linkedin.com/in/ayushdholakiya',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/ayush04',
    transform: 'scale(.92) translate(0 .5)',
    path: 'M6.94 11.1s1.9-.2 1.9-2.48C8.84 6.1 7.05 5 4.7 5H0v14h5.06c2.6 0 5.07-1.1 5.07-3.9 0-3.1-3.19-4-3.19-4zM2.9 7.3h1.6c.9 0 1.5.4 1.5 1.3 0 .9-.6 1.3-1.6 1.3H2.9V7.3zm1.9 9.4H2.9v-3.3h2c1.1 0 1.8.5 1.8 1.6 0 1.1-.8 1.7-1.9 1.7zM21.6 9.9c-2.8 0-4.6 2-4.6 4.6 0 2.8 1.7 4.6 4.7 4.6 2.2 0 3.7-1 4.2-2.9h-2.4c-.2.5-.7.9-1.7.9-1.2 0-2-.7-2.1-2h6.4c.2-3.1-1.4-5.2-4.5-5.2zm-2 3.5c.1-1 .8-1.6 1.9-1.6 1 0 1.7.6 1.8 1.6h-3.7zM15.6 6.9h5.7v1.4h-5.7z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ayush_d2212?stkn=bnZqcXFlZnUwdTky',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.3.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  },
];
</script>

<template>
  <div class="social-links">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.href"
      :aria-label="link.label"
      target="_blank"
      rel="noopener"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path :d="link.path" :transform="link.transform" />
      </svg>
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

.social-links svg {
  width: 20px;
  height: 20px;
  display: block;
}
</style>