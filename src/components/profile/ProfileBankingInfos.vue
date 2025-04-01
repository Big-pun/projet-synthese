<script setup>
import { ref, computed } from 'vue';

// state for the hover
const hovered = ref(false);

// define the props for receiving the data from the parent
const props = defineProps({
  title: {
    type: String,
    default: 'Modifier vos renseignements bancaires'
  },
  bankingDetails: {
    type: Object,
    default: () => ({
      institutionName: '',
      accountInfo: '',
      loanInfo: '',
      other: ''
    })
  }
});

// ensure that bankingInfo is always a valid object
const bankingInfo = computed(() => {
  return props.bankingDetails || {
    institutionName: '',
    accountInfo: '',
    loanInfo: '',
    other: ''
  };
});

// define the event for the edit
const emit = defineEmits(['edit']);

// function to open the edit form
function openEditForm() {
  emit('edit');
}
</script>

<template>
  <div class="box relative font-roboto w-full bg-light-gray rounded-lg mb-6 pb-1 transition-all duration-200 flex flex-col"
  @mouseenter="hovered = true"
      @mouseleave="hovered = false">

    <!-- En-tête de la section avec barre de couleur -->
    <div class="flex items-center justify-between mb-4 p-[14px] rounded-t-lg bg-gray relative">
      <h3 class="text-white ml-8 font-medium font-roboto text-base">Renseignements bancaires</h3>

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
        <p>{{ bankingInfo.institutionName || 'Non spécifié' }}</p>
      </div>

      <!-- Numéro de compte -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Compte</p>
        <p>{{ bankingInfo.accountInfo || 'Non spécifié' }}</p>
      </div>

      <!-- Prêts -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Prêts</p>
        <p>{{ bankingInfo.loanInfo || 'Non spécifié' }}</p>
      </div>

      <!-- Autres informations -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center mb-2">
        <p class="font-medium responsive-margin">Autres</p>
        <p>{{ bankingInfo.other || 'Non spécifié' }}</p>
      </div>
    </div>

    <!-- Bouton d'édition -->
    <div class="mx-6 mb-4 border-2 rounded-lg overflow-hidden bg-white mt-auto" 
    :class="hovered ? 'border-accent1' : 'border-accent2'">
      <button @click="openEditForm"
        class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray hover:text-white hover:bg-accent1">
        <span class="mr-2">+</span> Éditer cette section
      </button>
    </div>
    <!-- Table tag -->
    <span class="bg-accent2 tag"></span>
  </div>
</template>

<style scoped>
.tag {
  position: absolute;
  height: 60px;
  width: 30px;
  top: 0;
  right: 2%;
  transition: all 200ms ease;
  border-radius: 0 0 4px 4px;
}

.box:hover .tag {
  height: 75px;
  background-color: var(--color-accent1);
}
</style>