<script setup>
import { ref, reactive } from 'vue';
import { useProfileFormStore } from '@/stores/profileFormStore';
import { useModalStore } from '@/stores/modalStore';
import { mockUser } from '@/mock/userData';

// État pour le survol
const hovered = ref(false);

// Données bancaires (provenant du mock)
const bankingData = reactive({...mockUser.bankingDetails});

// Récupérer les stores
const formStore = useProfileFormStore();
const modalStore = useModalStore();

// Fonction pour ouvrir le formulaire d'édition
function openEditForm() {
  // Utiliser directement les champs définis dans formValidation.js
  formStore.setupForm('bankingInfo', { ...bankingData });
  
  // Ouvrir le modal
  modalStore.openModal();
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
        class="absolute svg-rectangle right-5 top-0 rounded-b transition-colors duration-200">
        <rect width="36" height="75" :class="{ 'rectangle-fill-default': !hovered, 'rectangle-fill-hovered': hovered }" />
      </svg>
    </div>

    <!-- Contenu des informations bancaires -->
    <div class="px-6 pt-4 space-y-2">
      <!-- Institution -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Institution</p>
        <p>{{ bankingData.institutionName || 'Non spécifié' }}</p>
      </div>

      <!-- Numéro de compte -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Compte</p>
        <p>{{ bankingData.accountInfo || 'Non spécifié' }}</p>
      </div>

      <!-- Prêts -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Prêts</p>
        <p>{{ bankingData.loanInfo || 'Non spécifié' }}</p>
      </div>

      <!-- Autres informations -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center mb-2">
        <p class="font-medium responsive-margin">Autres</p>
        <p>{{ bankingData.other || 'Non spécifié' }}</p>
      </div>
    </div>

    <!-- Bouton d'édition -->
    <div class="mx-6 mt-2 mb-4 border-2 rounded-lg overflow-hidden " 
    :class="hovered ? 'border-accent1' : 'border-accent2'">
      <button @click="openEditForm"
        class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray hover:bg-accent1 hover:text-white">
        <span class="mr-2">+</span> Éditer cette section
      </button>
    </div>
  </div>
</template>

<style scoped>
.rectangle-fill-default {
  fill: #F74949;
  transition: fill 0.2s ease;
}

.rectangle-fill-hovered {
  fill: #00EC86;
  transition: fill 0.2s ease;
}
</style>