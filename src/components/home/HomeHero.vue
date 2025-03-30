<template>

  <section class="flex items-center relative bg-[url(@/assets/img/Swirls.svg)] bg-no-repeat bg-cover bg-center bg-opacity-50 ">
    <div class="flex flex-col w-full main--full-width__boxed-section">
        <div class="py-20">
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
            <button v-if="!userStore.user" 
              @click="showSignUp"
              class="font-(family-name:--font-roboto) text-center text-white bg-accent1 hover:bg-hover px-5 py-2 rounded"
            >
              Inscription
            </button>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup>
  import { useUserStore } from '@/services/userStore';

  const userStore = useUserStore();

  const emit = defineEmits(['showSignup']);
</script>

<style scoped>

</style>
