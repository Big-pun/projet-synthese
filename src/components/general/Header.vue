<template>
  <nav class="flex items-center justify-between w-full max-w-1400px my-0 mx-auto border-b-3 border-accent1">
    <!-- LOGO -->
    <div class="w-1/12 my-5 mx-10">
      <img src="../../assets/img/LogoNom.svg" alt="logo camping">
    </div>

    <!-- MENUS -->
    <ul class="flex items-center mx-10 gap-10">

      <!-- if user is NOT connected -->
      <!-- Bouton Inscription -->
      <li v-if="!userStore.user" class="px-5 py-2 font-flex rounded text-light-gray bg-accent1 hover:bg-hover">
        <button @click="showSignup = true">Inscription</button>
      </li>
      <!-- Bouton Connexion -->
      <li v-if="!userStore.user" class="px-5 py-2 font-flex rounded text-light-gray bg-accent1 hover:bg-hover">
        <button @click="showLogin = true">Connexion</button>
      </li>

      <!-- if user is connected -->
      <!-- Bouton deconnexion -->
      <li v-if="userStore.user" class="px-5 py-2 font-flex rounded text-light-gray bg-accent1 hover:bg-hover">
        <button @click="handleLogout">Deconnexion</button>
      </li>
    </ul>

    <!-- Modale pour l'Inscription -->
    <Modal :isOpen="showSignup" @close="showSignup = false">
      <SubscriptionForm @closeModal="showSignup = false" />
    </Modal>

    <!-- Modale pour la Connexion -->
    <Modal :isOpen="showLogin" @close="showLogin = false">
      <ConnexionForm @closeModal="showLogin = false" />
    </Modal>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/general/Modal.vue';  
import SubscriptionForm from '@/components/connexion/SubscriptionForm.vue';  
import ConnexionForm from '@/components/connexion/ConnexionForm.vue';
import { useUserStore } from '@/services/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();

// États pour gérer l'affichage des modales
const showSignup = ref(false);
const showLogin = ref(false);

const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
  router.push('/accueil');
};
</script>

<style scoped>
</style>
