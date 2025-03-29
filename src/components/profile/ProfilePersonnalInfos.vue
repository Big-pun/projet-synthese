<script setup>
import { ref, computed } from 'vue';

const hovered = ref(false);

// Définir les props pour recevoir les données du parent
const props = defineProps({
  userData: {
    type: Object,
    default: () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: null
    })
  },
  userAddresses: {
    type: Array,
    default: () => []
  }
});

// Référence aux données utilisateur via props
const userInfo = computed(() => props.userData);

function getAddressByType(type) {
  return props.userAddresses.find(address => address.type === type);
}

function formatAddress(address) {
  if (!address) return 'Non spécifié';
  return `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.province}`;
}

function formatDate(date) {
  if (!date) return 'Non spécifié';
  return new Date(date).toLocaleDateString('fr-CA');
}

// Définir l'événement pour l'édition
const emit = defineEmits(['edit']);

function openEditForm() {
  emit('edit');
}
</script>

<template>
  <div
    class="lg:mt-24 font-roboto max-w-screen-lg mx-auto bg-light-gray rounded-lg mb-6 pb-1 transition-all duration-200"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false">
    <!-- En-tête de la section avec pastille de statut -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0">
      <h3 class="text-white ml-8 font-roboto">Renseignements personnels</h3>

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
          <p class="font-medium responsive-margin">Prénom</p>
          <p>{{ userInfo?.firstName || 'Non spécifié' }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 flex flex-row items-center">
          <p class="font-medium responsive-margin">Date de naissance</p>
          <p>{{ userInfo?.birthDate ? formatDate(userInfo.birthDate) : 'Non spécifié' }}</p>
        </div>
      </div>

      <!-- Deuxième colonne -->
      <div>
        <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
          <p class="font-medium responsive-margin">Nom</p>
          <p>{{ userInfo?.lastName || 'Non spécifié' }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 flex flex-row items-center">
          <p class="font-medium responsive-margin">Téléphone</p>
          <p>{{ userInfo?.phone || 'Non spécifié' }}</p>
        </div>
      </div>
    </div>

    <!-- Adresses -->
    <div class="mt-2 px-6">
      <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Courriel</p>
        <p>{{ userInfo?.email || 'Non spécifié' }}</p>
      </div>

      <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Adresse personnelle</p>
        <p>{{ formatAddress(getAddressByType('PERSONAL')) }}</p>
      </div>

      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Adresse au travail</p>
        <p>{{ formatAddress(getAddressByType('WORK')) }}</p>
      </div>
    </div>

    <!-- Boutons d'édition -->
    <div class="mx-6 mt-2 mb-4">
      <div class="border-2 rounded-lg bg-white overflow-hidden mb-2" 
        :class="hovered ? 'border-accent1' : 'border-accent2'">
        <button @click="openEditForm"
          class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray hover:bg-accent1">
          <span class="mr-2">+</span> Éditer les informations personnelles
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.rectangle-fill-default {
  fill: #F74949;
  transition: fill 0.2s ease;
}

.rectangle-fill-hovered {
  fill: #00EC86;
  transition: fill 0.2s ease;
}
.responsive-margin {
  margin-right: clamp(2rem, 2vw, 4rem);
}
</style>