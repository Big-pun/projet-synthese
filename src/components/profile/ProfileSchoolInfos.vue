<script setup>
import { ref, onMounted } from 'vue';
import { useSchoolStore } from '@/services/schoolStore';
import { useUserStore } from '@/services/userStore';
import { formatDate } from '@/utils/format';

const hovered = ref(false);
const schoolStore = useSchoolStore();
const userStore = useUserStore();

// Charger les données scolaires au montage du composant
onMounted(async () => {
  if (userStore.user?.id) {
    await schoolStore.fetchSchoolDetails(userStore.user.id);
  }
});

// Définir l'événement pour l'édition
const emit = defineEmits(['edit']);

function openEditForm() {
  emit('edit');
}
</script>

<template>
  <div class="font-roboto w-full bg-light-gray rounded-lg mb-6 pb-1 transition-all duration-200"
  @mouseenter="hovered = true"
  @mouseleave="hovered = false">

    <!-- En-tête de la section avec barre de couleur -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative">
      <h3 class="text-white ml-8 font-roboto">Établissement scolaire</h3>

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
        <p>{{ schoolStore.schoolDetails?.schoolName || 'Non spécifié' }}</p>
      </div>

      <!-- Domaine d'études -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Domaine</p>
        <p>{{ schoolStore.schoolDetails?.fieldOfStudy || 'Non spécifié' }}</p>
      </div>

      <!-- Début du programme -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Début du programme</p>
        <p>{{ formatDate(schoolStore.schoolDetails?.startDate) }}</p>
      </div>

      <!-- Fin du programme -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center mb-2">
        <p class="font-medium responsive-margin">Fin du programme</p>
        <p>{{ formatDate(schoolStore.schoolDetails?.projectedEndDate) }}</p>
      </div>
    </div>

    <!-- Bouton d'édition -->
    <div class="mx-6 mt-2 mb-4 border-2 rounded-lg overflow-hidden bg-white" 
    :class="hovered ? 'border-accent1' : 'border-accent2'">
      <button @click="openEditForm"
        class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray hover:bg-accent1">
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