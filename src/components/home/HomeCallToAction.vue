<script setup>
</script>

<template scoped>
    <section v-if="!userStore.user" class="flex items-center justify-between bg-gray mb-10">
      <div class="flex flex-col justify-center items-center main--full-width__boxed-section pb-15">
        <div class="flex flex-col items-center justify-center">
          <img src="@/assets/img/logoNom-White.svg" alt="Flow icon" class="w-[120px] pb-8 sm:pb-0" > <!--Je me suis amusé ;), c'est peut-être trop-->
          <h2 class="text-dark-gray py-8 text-3xl/normal text-center uppercase">Prêt(e) à rejoindre Flow et gérer ton budget en quelques&nbsp;clics?</h2>
        </div>
        <!--À VOIR SI ON REMPLACE LA CLASS DE P PAR UNE CLASS DANS LE THEME-->
        <p class="text-center text-base text-white">Inscris toi des maintenant et profite de l’ensemble de l’application gratuitement</p>
        <div class="flex justify-center pt-12">
          <button @click="showSignUp" class="font-(family-name:--font-roboto) text-center text-white bg-accent1 hover:bg-hover px-5 py-2 rounded">Inscription</button>
        </div>
      </div>
    </section>

</template>

<script setup>
   import { useUserStore } from '@/services/userStore';

  const userStore = useUserStore();

  const emit = defineEmits(['showSignup']);
</script>


<style></style>