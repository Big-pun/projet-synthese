<template scoped>

<section class="flex items-center w-full max-w-1400px my-0 mx-auto mt-15">
  <div class="flex flex-col w-full">
      <div class="bg-[url(@/assets/img/Swirls.svg)] bg-no-repeat bg-cover bg-center py-20">
        <div class="flex flex-col sm:flex-row items-center justify-center pb-5">
          <img
            src="@/assets/img/logo.svg"
            alt="Flow icon"
            class="w-[35px] pb-8 sm:pb-0 hover:animate-spin"
          />
          <!--Je me suis amusé ;), c'est peut-être trop-->
          <h1 class="text-black p-[6px] text-center uppercase">
            Bienvenue sur l’application flow
          </h1>
        </div>
        <!--À VOIR SI ON REMPLACE LA CLASS DE P PAR UNE CLASS DANS LE THEME-->
        <p class="text-center text-xl">
          Commencez à prendre le contrôle de vos finances dès aujourd'hui!
        </p>
        <div class="flex justify-center pt-12">
          <button
            @click="showSignup = true"
            class="font-(family-name:--font-roboto) text-center text-white bg-accent1 hover:bg-hover py-4 px-8 rounded-[5px]"
          >
            Inscription
          </button>
        </div>
      </div>
    </div>
</section>
  <!-- Modale pour l'Inscription -->
  <Modal :isOpen="showSignup" @close="showSignup = false">
    <SubscriptionForm @closeModal="showSignup = false" />
  </Modal>

  <!-- Modale pour la Connexion -->
  <Modal :isOpen="showLogin" @close="showLogin = false">
    <ConnexionForm @closeModal="showLogin = false" />
  </Modal>
</template>

<script setup>
  import { ref } from "vue";
  import Modal from "@/components/general/Modal.vue";
  import SubscriptionForm from "@/components/connexion/SubscriptionForm.vue";
  import ConnexionForm from "@/components/connexion/ConnexionForm.vue";

  // États pour gérer l'affichage des modales
  const showSignup = ref(false);
  const showLogin = ref(false);
</script>

<style scoped>

</style>
