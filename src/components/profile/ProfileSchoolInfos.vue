<script setup>
import { ref, reactive } from 'vue';
import { useProfileFormStore } from '@/stores/profileFormStore';
import { useModalStore } from '@/stores/modalStore';

// État pour le survol
const hovered = ref(false);

// Données scolaires (à remplacer par une API plus tard)
const schoolData = reactive({
  nom: 'Cegep de Trois-Rivieres',
  domaine: 'Developpement Web',
  debutProgramme: '10/10/2023',
  finProgramme: '06/06/2025'
});

// Récupérer les stores
const formStore = useProfileFormStore();
const modalStore = useModalStore();

// Configurer les champs du formulaire pour les informations scolaires
const schoolInfoFields = [
    { key: 'nom', label: 'Nom de l\'établissement' },
    { key: 'domaine', label: 'Domaine d\'études' },
    { key: 'debutProgramme', label: 'Début du programme' },
    { key: 'finProgramme', label: 'Fin du programme' }
  
  ];

// Fonction pour ouvrir le modal d'édition
function openEditForm() {
  // Étape 1: Configurer le formulaire
  formStore.chooseForm(
    'schoolInfo',
    'Éditer les informations scolaires',
    schoolInfoFields,
    { ...schoolData } // Clone pour éviter les modifications directes
  );
  
  // Étape 2: Ouvrir le modal
  modalStore.openModal();
}
</script>

<template>
  <div class="font-roboto w-full bg-light-gray rounded-lg mb-6 pb-1 transition-all duration-200"
  @mouseenter="hovered = true"
  @mouseleave="hovered = false">

    <!-- En-tête de la section avec barre de couleur -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative">
      <h3 class="text-white ml-8">Etablissement scolaire</h3>

      <!-- Rectangle coloré à droite -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-0 rounded-b transition-colors duration-200">
        <rect width="36" height="75" :class="{ 'rectangle-fill-default': !hovered, 'rectangle-fill-hovered': hovered }" />
      </svg>
    </div>

    <!-- Contenu des informations scolaires -->
    <div class="px-6 pt-4 space-y-2">
      <!-- Nom de l'établissement -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Nom</p>
        <p>{{ schoolData.nom || 'Non spécifié' }}</p>
      </div>

      <!-- Domaine d'études -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Domaine</p>
        <p>{{ schoolData.domaine || 'Non spécifié' }}</p>
      </div>

      <!-- Début du programme -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Debut du programme</p>
        <p>{{ schoolData.debutProgramme || 'Non spécifié' }}</p>
      </div>

      <!-- Fin du programme -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center mb-2">
        <p class="font-medium responsive-margin">Fin du programme</p>
        <p>{{ schoolData.finProgramme || 'Non spécifié' }}</p>
      </div>
    </div>

    <!-- Bouton d'édition -->
    <div class="mx-6 mt-2 mb-4 border-2 rounded-lg overflow-hidden" 
    :class="hovered ? 'border-accent1' : 'border-accent2'">
      <button @click="openEditForm"
        class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray hover:bg-accent1 hover:text-white">
        <span class="mr-2">+</span> Editer cette section
      </button>
    </div>
  </div>
</template>

<style scoped>

/* Définir deux classes distinctes avec leurs propres couleurs */
.rectangle-fill-default {
  fill: #F74949;
  transition: fill 0.2s ease;
}

.rectangle-fill-hovered {
  fill: #00EC86;
  transition: fill 0.2s ease;
}
</style>