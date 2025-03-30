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
  <div class="box flex flex-col font-roboto w-full bg-light-gray rounded-lg mb-6 pb-1 transition-all duration-200 relative"
  @mouseenter="hovered = true"
  @mouseleave="hovered = false">

    <!-- header -->
    <div class="flex items-center justify-between mb-4 p-[14px] rounded-t-lg bg-gray relative">
      <h3 class="text-white ml-8 font-medium font-roboto text-base">Établissement scolaire</h3>
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
    <div class="mx-6 mt-auto mb-4 border-2 rounded-lg overflow-hidden bg-white" 
    :class="hovered ? 'border-accent1' : 'border-accent2'">
      <button @click="openEditForm"
        class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray hover:bg-accent1">
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