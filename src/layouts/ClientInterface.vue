<script setup>
import Footer from '@/components/general/Footer.vue';
import Header from '@/components/general/Header.vue';
import Sidebar from '@/components/general/Sidebar.vue';

</script>

<template>
  <Sidebar></Sidebar>
  <Header></Header>
  <main>
    <RouterView></RouterView>
  </main>
  <Footer></Footer>
</template>

<style></style>