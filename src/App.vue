<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/general/Sidebar.vue';
import Header from './components/general/Header.vue';
import Footer from './components/general/Footer.vue';
import { computed } from 'vue';
import { useUserStore } from './services/userStore';

const userConnected = computed(() => {
  const userStore = useUserStore();
  return userStore.user !== null;
});

</script>

<template>

  <!-- general lyout shared by the entire app + dyncamic content handled by the router -->
  <div class="app-container">
    <div class="flex">
      <Sidebar :userConnected="userConnected"></Sidebar>
      <div class="flex flex-col grow bg-white overflow-y-auto">
        <Header></Header>
        <main class="grow"> <!-- ensures that the footer is pushed to the bottom of the page -->
          <RouterView></RouterView>
        </main>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
