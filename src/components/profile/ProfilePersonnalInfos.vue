<script setup>
import { ref, reactive } from 'vue';
import { useProfileFormStore } from '@/stores/profileFormStore';
import { useModalStore } from '@/stores/modalStore';

const hovered = ref(false);

const userData = reactive({
  prenom: 'Bruno',
  nom: 'Gautier',
  dateNaissance: '02/01/1992',
  telephone: '581 - 422 - 5029',
  courriel: 'brunogautier@gmail.com',
  adressePersonnelle: '885 rue de l\'escarpement, Trois-Rivieres, G2X5L2',
  adresseTravail: '22 rue du Fort, Trois-Rivieres, G3L5M4'
});

const formStore = useProfileFormStore();
const modalStore = useModalStore();

const personalInfoFields = [
  { key: 'prenom', label: 'Prénom' },
  { key: 'nom', label: 'Nom' },
  { key: 'dateNaissance', label: 'Date de naissance' },
  { key: 'telephone', label: 'Téléphone' },
  { key: 'courriel', label: 'Courriel' },
  { key: 'adressePersonnelle', label: 'Adresse personnelle' },
  { key: 'adresseTravail', label: 'Adresse au travail' }
];

function openEditForm() {
  formStore.chooseForm(
    'personnalInfo',
    'Éditer les renseignements personnels',
    personalInfoFields,
    { ...userData }
  );
  
  modalStore.openModal();
}
</script>

<template>
  <div
    class="lg:mt-24 font-roboto max-w-screen-lg mx-auto bg-light-gray rounded-lg mb-6 pb-1 transition-all duration-200"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false">
    <!-- En-tête de la section avec pastille de statut -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0">
      <h3 class="text-white ml-8">Renseignements personnels</h3>

      <!-- Rectangle SVG avec changement de couleur basé sur l'état hovered -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-0 rounded-b svg-rectangle">
        <rect width="36" height="75" :class="{ 'rectangle-fill-default': !hovered, 'rectangle-fill-hovered': hovered }" />
      </svg>
    </div>

    <!-- Contenu du profil en deux colonnes -->
    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 px-6 pt-4">
      <!-- Première colonne -->
      <div>
        <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
          <p class="font-medium responsive-margin ">Prenom</p>
          <p class="">{{ userData.prenom || 'Non spécifié' }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 flex flex-row items-center">
          <p class="font-medium responsive-margin  ">Date de naissance</p>
          <p class="">{{ userData.dateNaissance || 'Non spécifié' }}</p>
        </div>
      </div>

      <!-- Deuxième colonne -->
      <div>
        <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
          <p class="font-medium responsive-margin  ">Nom</p>
          <p class="">{{ userData.nom || 'Non spécifié' }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 flex flex-row items-center ">
          <p class="font-medium responsive-margin  ">Telephone</p>
          <p class="">{{ userData.telephone || 'Non spécifié' }}</p>
        </div>
      </div>
    </div>

    <!-- Adresses -->
    <div class="mt-2 px-6">
      <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin  ">Courriel</p>
        <p class="">{{ userData.courriel || 'Non spécifié' }}</p>
      </div>

      <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center ">
        <p class="font-medium responsive-margin">Adresse personnelle</p>
        <p class="">{{ userData.adressePersonnelle || 'Non spécifié' }}</p>
      </div>

        <div class="rounded-lg bg-white p-4 flex flex-row items-center ">
        <p class="font-medium responsive-margin">Adresse au travail</p>
        <p class="">{{ userData.adresseTravail || 'Non spécifié' }}</p>
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

<style>

</style>