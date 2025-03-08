<template>
  <div class="mt-24 font-roboto max-w-screen-lg mx-auto bg-light-gray rounded-lg shadow-md mb-6 pb-1 transition-all duration-200" 
       @mouseenter="hovered = true" 
       @mouseleave="hovered = false">
    
    <!-- En-tête de la section avec pastille de statut -->
    <div class="flex items-center justify-between mb-4 p-4 rounded-t-lg bg-gray relative">
      <h3 class="text-white">Renseignements personnels</h3>
      
      <!-- Rectangle SVG avec changement de couleur lors du survol -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
           class="absolute right-5 top-0 rounded-b transition-colors duration-200">
        <rect width="36" height="75" :fill="hovered ? '#00EC86' : '#F74949'"/>
      </svg>
    </div>
    
    <!-- Contenu du profil en deux colonnes -->
    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 px-6 pt-4" >
      <!-- Première colonne -->
      <div>
        <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
          <p class="responsive-margin text-sm text-gray-500">Prenom</p>
          <p class="">{{ userData.prenom || 'Non spécifié' }}</p>
        </div>
        
        <div class="rounded-lg bg-white p-4 flex flex-row items-center">
          <p class="responsive-margin text-sm text-gray-500">Date de naissance</p>
          <p class="">{{ userData.dateNaissance || 'Non spécifié' }}</p>
        </div>
      </div>
      
      <!-- Deuxième colonne -->
      <div>
        <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
          <p class="responsive-margin text-sm text-gray-500">Nom</p>
          <p class="">{{ userData.nom || 'Non spécifié' }}</p>
        </div>
        
        <div class="rounded-lg bg-white p-4 flex flex-row items-center ">
          <p class="responsive-margin text-sm text-gray-500">Telephone</p>
          <p class="">{{ userData.telephone || 'Non spécifié' }}</p>
        </div>
      </div>
    </div>
    
    <!-- Adresses -->
    <div class="mt-2 px-6">
      <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
          <p class="responsive-margin text-sm text-gray-500">Courriel</p>
          <p class="">{{ userData.courriel || 'Non spécifié' }}</p>
      </div>

      <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center ">
        <p class="responsive-margin text-sm text-gray-500">Adresse personnelle</p>
        <p class="">{{ userData.adressePersonnelle || 'Non spécifié' }}</p>
      </div>
      
      <div class="rounded-lg bg-white p-4 flex flex-row items-center ">
        <p class="responsive-margin text-sm text-gray-500">Adresse au travail</p>
        <p class="">{{ userData.adresseTravail || 'Non spécifié' }}</p>
      </div>
    </div>
    
    <!-- Bouton d'édition -->
    <div class="mx-6 mt-2 mb-4 border-2 border-accent1 rounded-lg overflow-hidden">
      <button 
        @click="openEditModal"
        class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray"
        :class="hovered ? 'text-white bg-accent1' : 'bg-white'">
        <span class="mr-2">+</span> Editer cette section
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// État pour le survol
const hovered = ref(false);

// Données utilisateur (API)
const userData = reactive({
  prenom: 'Bruno',
  nom: 'Gautier',
  dateNaissance: '02/01/1992',
  telephone: '581 - 422 - 5029',
  courriel: 'brunogautier@gmail.com',
  adressePersonnelle: '885 rue de l\'escarpement, Trois-Rivieres, G2X5L2',
  adresseTravail: '22 rue du Fort, Trois-Rivieres, G3L5M4'
});

</script>

<style>
.responsive-margin {
    margin-right: clamp(1rem, 2vw, 3rem); /* Marge dynamique */
  }
</style>