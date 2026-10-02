<script setup>
import TunnelBackground from './components/TunnelBackground.vue';
import SiteHeader from './components/SiteHeader.vue';
import HeroSection from './components/HeroSection.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="page-container">
    <TunnelBackground />

    <div class="content-overlay">
      <SiteHeader />
      <HeroSection />
      <SiteFooter />
    </div>
  </div>
</template>