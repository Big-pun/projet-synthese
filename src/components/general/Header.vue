<template>
  <nav class="flex items-center justify-between header-footer-container border-b-3 border-accent1">
    <!-- LOGO -->
    <div class="w-1/12 mx-10">
      <img src="../../assets/img/LogoNom.svg" alt="logo camping">
    </div>

    <!-- MENUS -->
    <ul class="flex items-center mx-10 gap-10">

      <!-- if user is NOT connected -->
      <!-- Bouton Inscription -->
      <li v-if="!userStore.user" class="px-5 py-2 font-flex rounded text-light-gray bg-accent1 hover:bg-hover">
        <button @click="emit('showSignup')">Inscription</button>
      </li>
      <!-- Bouton Connexion -->
      <li v-if="!userStore.user" class="px-5 py-2 font-flex rounded text-light-gray bg-accent1 hover:bg-hover">
        <button @click="emit('showLogin')">Connexion</button>
      </li>

      <!-- if user is connected -->
      <!-- Bouton deconnexion -->
      <li v-if="userStore.user" class="px-5 py-2 font-flex rounded text-light-gray bg-accent1 hover:bg-hover">
        <button @click="emit('logout')">Déconnexion</button>
      </li>
    </ul>

  </nav>
</template>

<script setup>

import { useUserStore } from '@/services/userStore';

const userStore = useUserStore();

const emit = defineEmits(['showSignup', 'showLogin', 'logout']);

</script>

<style scoped>
</style>
