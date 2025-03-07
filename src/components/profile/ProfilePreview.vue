<script setup>
import { ref } from 'vue';

// Ces données viendront du backend plus tard
const userData = ref({
  nom: 'Bruno Gautier',
  email: 'brunogautier@gmail.com',
  telephone: '581 - 422 - 5029'
});
</script>

<template>
  <div class="mb-8 font-roboto p-4 max-w-screen-lg mx-auto">
    <!-- Titre de la section -->
    <div class="flex items-center mb-4">
      <img src="@/assets/img/logo.svg" alt="Logo" class="w-6 h-6 mr-2" />
      <h1 class="uppercase text-gray font-bold ">Details du profil</h1>
    </div>

    <!-- Carte de profil -->
    <div class="grid grid-cols-12 gap-4">
      <!-- Carte d'aperçu - occupe toute la largeur sur mobile -->
      <div class="col-span-12 md:col-span-6 bg-light-gray rounded-3xl p-8 relative overflow-hidden shadow-sm">
        <!-- Bordure rouge en bas -->
        <div class="absolute bottom-0 left-0 right-0 h-3 bg-accent2"></div>
        
        <h2 class="text-center text-accent2 mb-6 font-medium">Aperçu</h2>
        <div class="flex flex-row items-center gap-8">
          <div class="shrink-0 w-28 h-28">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 92 84" fill="none">
              <path
                d="M91.3846 42C91.3846 18.8416 70.8885 0 45.6923 0C20.4961 0 0 18.8416 0 42C0 53.8426 5.38106 64.5353 13.9881 72.1779C14.1896 72.4191 14.4283 72.6145 14.7076 72.7792C22.8608 79.7192 33.7296 84 45.6923 84C57.655 84 68.5238 79.7192 76.677 72.7792C76.9563 72.6145 77.195 72.4191 77.3965 72.1779C86.0036 64.5353 91.3846 53.8426 91.3846 42ZM45.6923 5.25C67.739 5.25 85.6731 21.7366 85.6731 42C85.6731 50.5924 82.4241 58.4879 77.0286 64.753C74.5517 57.4106 67.4803 51.6626 57.883 49.0177C63.1132 45.5385 66.5342 39.9016 66.5342 33.532C66.5342 22.9824 57.186 14.3999 45.6923 14.3999C34.1986 14.3999 24.8504 22.9824 24.8504 33.532C24.8504 39.9016 28.2714 45.5385 33.5016 49.0177C23.9043 51.6626 16.833 57.4106 14.356 64.753C8.96053 58.4879 5.71154 50.5924 5.71154 42C5.71154 21.7366 23.6456 5.25 45.6923 5.25ZM30.5619 33.532C30.5619 25.8774 37.3481 19.6499 45.6923 19.6499C54.0365 19.6499 60.8227 25.8774 60.8227 33.532C60.8227 41.1865 54.0365 47.4141 45.6923 47.4141C37.3481 47.4141 30.5619 41.1865 30.5619 33.532ZM19.1556 69.4119C20.0141 59.7871 31.1178 52.6641 45.6923 52.6641C60.2668 52.6641 71.3705 59.7871 72.229 69.4119C65.1614 75.1994 55.8806 78.75 45.6923 78.75C35.504 78.75 26.2232 75.1994 19.1556 69.4119Z"
                fill="#F74949" />
            </svg>
          </div>
          
          <div class="flex flex-col text-left space-y-1">  
            <p class="text-xl text-black">{{ userData.nom }}</p>
            <p class="text-gray text-base">{{ userData.email }}</p>
            <p class="text-gray text-base">{{ userData.telephone }}</p>
          </div>
        </div>
      </div>

      <!-- Boutons - sur mobile, ils sont sous la carte et empilés -->
      <div class="col-span-12 md:col-span-6 flex flex-col justify-center gap-4">
        <button
          class="flex items-center justify-around bg-gray text-white py-3 px-4 rounded-lg hover:bg-hover transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.0612 23.3763L15.6875 29.75H11.4688V33.9688H7.25V38.1875H0.21875V31.1562L15.0299 16.3451C14.5458 15.0459 14.2812 13.6398 14.2812 12.1719C14.2812 5.57035 19.6328 0.21875 26.2344 0.21875C32.8359 0.21875 38.1875 5.57035 38.1875 12.1719C38.1875 18.7734 32.8359 24.125 26.2344 24.125C24.7665 24.125 23.3604 23.8604 22.0612 23.3763ZM15.6858 17.7986L1.625 31.8594V36.7812H5.84375V32.5625H10.0625V28.3438H14.9844L20.6076 22.7205C18.5197 21.6044 16.8018 19.8866 15.6858 17.7986ZM36.7812 12.1719C36.7812 6.347 32.0593 1.625 26.2344 1.625C20.4095 1.625 15.6875 6.347 15.6875 12.1719C15.6875 17.9968 20.4095 22.7188 26.2344 22.7188C32.0593 22.7188 36.7812 17.9968 36.7812 12.1719ZM33.9688 8.65625C33.9688 6.3263 32.08 4.4375 29.75 4.4375C27.42 4.4375 25.5312 6.3263 25.5312 8.65625C25.5312 10.9862 27.42 12.875 29.75 12.875C32.08 12.875 33.9688 10.9862 33.9688 8.65625ZM32.5625 8.65625C32.5625 7.10295 31.3033 5.84375 29.75 5.84375C28.1967 5.84375 26.9375 7.10295 26.9375 8.65625C26.9375 10.2096 28.1967 11.4688 29.75 11.4688C31.3033 11.4688 32.5625 10.2096 32.5625 8.65625Z"
              fill="#FBFBFB" />
          </svg>
          Changer mon mot de passe
        </button>

        <button
          class="flex items-center justify-center bg-gray text-white py-3 px-4 rounded-lg hover:bg-accent2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          Supprimer mon profil
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles spécifiques au composant si nécessaire */
</style>