<script setup>
import { ref, computed } from 'vue';
import { formatDate } from '@/utils/format';

const hovered = ref(false);

// add the props for receiving the data from the parent
const props = defineProps({
  schoolDetails: {
    type: Object,
    default: () => ({
      schoolName: '',
      fieldOfStudy: '',
      startDate: '',
      projectedEndDate: ''
    })
  }
});

// reference to the data via props rather than store
const schoolInfo = computed(() => props.schoolDetails);

// define the event for the edit
const emit = defineEmits(['edit']);

function openEditForm() {
  emit('edit');
}
</script>

<template>
  <div class="font-roboto w-full bg-light-gray rounded-lg mb-6 pb-1 transition-all duration-200"
  @mouseenter="hovered = true"
  @mouseleave="hovered = false">

    <!-- header -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative">
      <h3 class="text-white ml-8 font-roboto">Établissement scolaire</h3>

      <!-- Rectangle -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-0 rounded-b transition-colors duration-200">
        <rect width="36" height="75" :class="{ 'rectangle-fill-default': !hovered, 'rectangle-fill-hovered': hovered }" />
      </svg>
    </div>

    <!-- school information content -->
    <div class="px-6 pt-4 space-y-2">
      <!-- school name -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Nom</p>
        <p>{{ schoolInfo?.schoolName || 'Non spécifié' }}</p>
      </div>

      <!-- field of study -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Domaine</p>
        <p>{{ schoolInfo?.fieldOfStudy || 'Non spécifié' }}</p>
      </div>

      <!-- start date -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center">
        <p class="font-medium responsive-margin">Début du programme</p>
        <p>{{ formatDate(schoolInfo?.startDate) }}</p>
      </div>

      <!-- projected end date -->
      <div class="rounded-lg bg-white p-4 flex flex-row items-center mb-2">
        <p class="font-medium responsive-margin">Fin du programme</p>
        <p>{{ formatDate(schoolInfo?.projectedEndDate) }}</p>
      </div>
    </div>

    <!-- edit button -->
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