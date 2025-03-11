<script setup>
import Footer from '@/components/general/Footer.vue';
import Header from '@/components/general/Header.vue';
import Sidebar from '@/components/general/Sidebar.vue';

</script>

<template>
  <div class="flex">
    <Sidebar class="w-max sticky top-0 min-h-[100vh] h-full"></Sidebar>
    <div class="flex flex-col grow p-5 bg-white overflow-y-auto">
      <Header></Header>
      <main class="grow"> <!-- ensures that the footer is pushed to the bottom of the page -->
        <RouterView></RouterView>
      </main>
      <Footer></Footer>
    </div>
  </div>
</template>

<style>
</style>