<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useProfileFormStore } from '@/stores/profileFormStore';
import { useModalStore } from '@/stores/modalStore';
import { mockUser, formatDate, getAddressByType, formatAddress } from '@/mock/userData';

const hovered = ref(false);
const userData = reactive({...mockUser});
const selectedAddressType = ref('PERSONAL'); // Type d'adresse par défaut

const formStore = useProfileFormStore();
const modalStore = useModalStore();

function openEditForm() {
  formStore.setupForm('personnalInfo', { 
    firstName: userData.firstName, 
    lastName: userData.lastName,
    birthDate: userData.birthDate,
    phone: userData.phone,
    email: userData.email,
    password: '' // Champ vide pour le mot de passe par mesure de sécurité
  });
  
  modalStore.openModal();
}

function openAddressForm(addressType = 'PERSONAL') {
  selectedAddressType.value = addressType;
  formStore.setupAddressForm(addressType, userData.addresses);
  modalStore.openModal();
}

// Pour gérer le changement de type d'adresse
function handleAddressTypeChange(event) {
  const newType = event.target.value;
  selectedAddressType.value = newType;
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
          <p class="font-medium responsive-margin ">Prénom</p>
          <p class="">{{ userData.firstName || 'Non spécifié' }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 flex flex-row items-center">
          <p class="font-medium responsive-margin  ">Date de naissance</p>
          <p class="">{{ formatDate(userData.birthDate) }}</p>
        </div>
      </div>

      <!-- Deuxième colonne -->
      <div>
        <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
          <p class="font-medium responsive-margin  ">Nom</p>
          <p class="">{{ userData.lastName || 'Non spécifié' }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 flex flex-row items-center ">
          <p class="font-medium responsive-margin  ">Téléphone</p>
          <p class="">{{ userData.phone || 'Non spécifié' }}</p>
        </div>
      </div>
    </div>

    <!-- Adresses -->
    <div class="mt-2 px-6">
      <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin  ">Courriel</p>
        <p class="">{{ userData.email || 'Non spécifié' }}</p>
      </div>

      <div class="rounded-lg bg-white mb-2 p-4 flex flex-row items-center ">
        <p class="font-medium responsive-margin">Adresse personnelle</p>
        <p class="">{{ formatAddress(getAddressByType(userData.addresses, 'PERSONAL')) }}</p>
      </div>

      <div class="rounded-lg bg-white p-4 flex flex-row items-center ">
        <p class="font-medium responsive-margin">Adresse au travail</p>
        <p class="">{{ formatAddress(getAddressByType(userData.addresses, 'WORK')) }}</p>
      </div>
    </div>

    <!-- Boutons d'édition -->
    <div class="mx-6 mt-2 mb-4">
      <div class="border-2 rounded-lg overflow-hidden mb-2" 
        :class="hovered ? 'border-accent1' : 'border-accent2'">
        <button @click="openEditForm"
          class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray hover:bg-accent1 hover:text-white">
          <span class="mr-2">+</span> Éditer les informations personnelles
        </button>
      </div>
      
      <!-- Sélection du type d'adresse à modifier -->
      <div class="border-2 rounded-lg overflow-hidden" 
        :class="hovered ? 'border-accent1' : 'border-accent2'">
        <div class="w-full p-2 flex items-center justify-between">
          <select 
            v-model="selectedAddressType"
            @change="handleAddressTypeChange"
            class="w-full bg-transparent text-gray py-2 px-3 rounded focus:outline-none">
            <option value="PERSONAL">Adresse personnelle</option>
            <option value="WORK">Adresse au travail</option>
          </select>
          <button @click="openAddressForm(selectedAddressType.value)"
            class="ml-2 px-4 py-2 bg-accent2 text-white rounded hover:bg-accent1 transition-colors">
            Éditer
          </button>
        </div>
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
</style>