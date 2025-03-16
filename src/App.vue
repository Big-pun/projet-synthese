<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/general/Sidebar.vue';
import Header from './components/general/Header.vue';
import Footer from './components/general/Footer.vue';
import { ref } from 'vue';

// userIsConnected is hardcoded for now, will need to be replaced with a real check / store variable
const userConnected = ref(true);
</script>

<template>

  <!-- general lyout shared by the entire app + dyncamic content handled by the router -->
  <div class="app-container">
    <div class="flex">
      <Sidebar :userConnected="userConnected"></Sidebar>
      <div class="flex flex-col grow p-5 bg-white overflow-y-auto">
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
