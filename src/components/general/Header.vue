<template>
  <nav class="flex items-center justify-between header-footer-container border-b-3 border-accent1">
    <!-- LOGO -->
    <img
            src="@/assets/img/LogoNom.svg"
            alt="Flow logo"
            class="w-[100px] hidden sm:block"
      />
      <img
            src="@/assets/img/logo.svg"
            alt="Flow logo"
            class="w-[30px] block sm:hidden"
      />

    <!-- MENUS -->
    <ul class="flex items-center justify-end gap-10">

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
