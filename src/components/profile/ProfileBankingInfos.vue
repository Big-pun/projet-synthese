<script setup>
import { ref, reactive } from 'vue';

// État pour le survol
const hovered = ref(false);

// Données bancaires (à remplacer par une API plus tard)
const bankingData = reactive({
  institution: 'Desjardins',
  compte: '815-999-5666',
  prets: 'Aucun',
  autres: '-'
});

// Fonction pour ouvrir le modal d'édition (à implémenter plus tard)
function openEditModal() {
  // Cette fonction sera implémentée avec le backend
  console.log('Ouverture du modal d\'édition bancaire');
}
</script>

<template>
  <div class="font-roboto w-full bg-light-gray rounded-lg mb-6 pb-1 transition-all duration-200" 
       @mouseenter="hovered = true" 
       @mouseleave="hovered = false">
    
    <!-- En-tête de la section avec barre de couleur -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative">
      <h3 class="text-white ml-8">Renseignements bancaires</h3>
      
      <!-- Rectangle coloré à droite -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
           class="absolute right-5 top-0 rounded-b transition-colors duration-200">
        <rect width="36" height="75" :fill="hovered ? '#00EC86' : '#F74949'"/>
      </svg>
    </div>
    
    <!-- Contenu des informations bancaires -->
    <div class="px-6 pt-4 space-y-2">
      <!-- Institution -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Institution</p>
        <p>{{ bankingData.institution || 'Non spécifié' }}</p>
      </div>
      
      <!-- Numéro de compte -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Compte</p>
        <p>{{ bankingData.compte || 'Non spécifié' }}</p>
      </div>
      
      <!-- Prêts -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Prets</p>
        <p>{{ bankingData.prets || 'Non spécifié' }}</p>
      </div>
      
      <!-- Autres informations -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center mb-2">
        <p class="font-medium responsive-margin">Autres</p>
        <p>{{ bankingData.autres || 'Non spécifié' }}</p>
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

<style scoped>
.responsive-margin {
  margin-right: clamp(1rem, 2vw, 3rem); /* Marge dynamique */
}
</style>