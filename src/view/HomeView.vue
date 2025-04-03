<script setup>
import SubscriptionForm from '@/components/connexion/SubscriptionForm.vue';
import Modal from '@/components/general/Modal.vue';
import HomeCallToAction from '@/components/home/HomeCallToAction.vue';
import HomeFeatures from '@/components/home/HomeFeatures.vue';
import HomeHero from '@/components/home/HomeHero.vue';
import HomeReviews from '@/components/home/HomeReviews.vue';
import HomeScreenShots from '@/components/home/HomeScreenShots.vue';
import { ref } from 'vue';

const showSignup = ref(false);

const handleShowSignup = () => {
  showSignup.value = true;
};

</script>

<template>
  <div class="main--full-width">
    <HomeHero @showSignup="handleShowSignup"></HomeHero>
    <HomeScreenShots></HomeScreenShots>
    <HomeFeatures></HomeFeatures>
    <HomeReviews></HomeReviews>
    <HomeCallToAction @showSignup="handleShowSignup"></HomeCallToAction>
  </div>

  <!-- Subscription Modal -->
  <Modal :isOpen="showSignup" @close="showSignup = false">
    <SubscriptionForm @closeModal="showSignup = false" />
  </Modal>
</template>

<style></style>