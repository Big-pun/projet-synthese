<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/general/Sidebar.vue';
import Header from './components/general/Header.vue';
import Footer from './components/general/Footer.vue';
import { computed, ref } from 'vue';
import { useUserStore } from './services/userStore';
import Modal from '@/components/general/Modal.vue';  
import SubscriptionForm from '@/components/connexion/SubscriptionForm.vue';  
import ConnexionForm from '@/components/connexion/ConnexionForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

const userConnected = computed(() => {
  return userStore.user !== null;
});

const handleLogout = () => {
  userStore.logout();
  router.push('/accueil');
};

const handleShowSignup = () => {
  showSignup.value = true;
};

const handleShowLogin = () => {
  showLogin.value = true;
};

// États pour gérer l'affichage des modales
const showSignup = ref(false);
const showLogin = ref(false);

</script>

<template>

  <!-- general lyout shared by the entire app + dyncamic content handled by the router -->
  <div class="app-container">
    <div class="flex">
      <Sidebar
       :userConnected="userConnected"
       @showSignup = "handleShowSignup"
       @showLogin = "handleShowLogin"
       @logout = "handleLogout">
      </Sidebar>
      <div class="flex flex-col grow bg-white overflow-y-auto" >
        <Header
         @showSignup = "handleShowSignup"
         @showLogin = "handleShowLogin"
         @logout = "handleLogout">
        </Header>
        <main class="grow relative"> <!-- ensures that the footer is pushed to the bottom of the page -->
          <RouterView></RouterView>
        </main>
        <Footer></Footer>
      </div>
    </div>
  </div>

  <!-- Modale pour l'Inscription -->
  <Modal :isOpen="showSignup" @close="showSignup = false">
    <SubscriptionForm @closeModal="showSignup = false" />
  </Modal>

  <!-- Modale pour la Connexion -->
  <Modal :isOpen="showLogin" @close="showLogin = false">
    <ConnexionForm @closeModal="showLogin = false" />
  </Modal>
</template>

<style scoped></style>
