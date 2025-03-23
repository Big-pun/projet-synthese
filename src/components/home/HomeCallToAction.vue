<script setup>
</script>

<template scoped>
    <section class="lex items-center justify-between w-full max-w-1400px my-0 mx-auto">
      <div class="flex flex-col justify-center items-center p-15 w-full bg-gray rounded-3xl">
        <div class="flex flex-col items-center justify-center">
          <img src="@/assets/img/logoNom-White.svg" alt="Flow icon" class="w-[120px] pb-8 sm:pb-0" > <!--Je me suis amusé ;), c'est peut-être trop-->
          <h2 class="text-dark-gray py-8 text-4xl/normal text-center uppercase">Prêt(e) à rejoindre Flow et gérer ton budget en quelques clics?</h2>
        </div>
        <!--À VOIR SI ON REMPLACE LA CLASS DE P PAR UNE CLASS DANS LE THEME-->
        <p class="text-center text-base text-white">Inscris toi des maintenant et profite de l’ensemble de l’application gratuitement</p>
        <div class="flex justify-center pt-12">
          <button  @click="showSignup = true" class="font-(family-name:--font-roboto) text-center text-white bg-accent1 hover:bg-hover py-4 px-8 rounded-[5px]">Inscription</button>
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


<style></style>