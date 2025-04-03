<script setup>
import HomeCallToAction from '@/components/home/HomeCallToAction.vue';
import HomeFeatures from '@/components/home/HomeFeatures.vue';
import HomeHero from '@/components/home/HomeHero.vue';
import HomeReviews from '@/components/home/HomeReviews.vue';
import HomeScreenShots from '@/components/home/HomeScreenShots.vue';

const props = defineProps({
  showSignUp: Function
});
</script>

<template>
  <div class="main--full-width">
    <HomeHero :showSignUp="showSignUp"></HomeHero>
    <HomeScreenShots></HomeScreenShots>
    <HomeFeatures></HomeFeatures>
    <HomeReviews></HomeReviews>
    <HomeCallToAction @showSignUp="$emit('showSignUp')"></HomeCallToAction>
  </div>
</template>

<style></style>