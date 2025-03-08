<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  isOpen: Boolean,
  formFields: Array,
  formData: Object
});

const emit = defineEmits(['update:isOpen', 'save']);

function closeModal() {
  emit('update:isOpen', false);
}

function handleSave() {
  emit('save', props.formData);
  closeModal();
}
</script>

<template>
  <div v-if="isOpen" 
       class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-roboto">
    <div class="bg-light-gray rounded-lg shadow-xl w-full max-w-xl mx-4 transition-all duration-200">
      <!-- En-tête du modal avec style cohérent -->
      <div class="flex items-center justify-between p-3 rounded-t-lg bg-gray relative">
        <h3 class="text-white ml-8">{{ title }}</h3>
        
        <!-- Rectangle coloré à droite comme dans les autres composants -->
        <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
             class="absolute right-5 top-0 rounded-b transition-colors duration-200">
          <rect width="36" height="75" fill="#00EC86"/>
        </svg>
      </div>
      
      <!-- Corps du formulaire -->
      <div class="p-6 space-y-3">
        <div v-for="field in formFields" :key="field.key" class="mb-4">
          <div class="rounded-lg bg-white p-4 max-w-xl grid grid-cols-2">
            <label class="block font-medium mb-2">{{ field.label }}</label>
            <input 
              v-model="formData[field.key]" 
              :type="field.type || 'text'" 
              class="w-full p-2 border border-gray-300 rounded-md focus:border-accent1 focus:ring-1 focus:ring-accent1 outline-none"
            >
          </div>
        </div>
      </div>
      
      <!-- Pied du modal avec actions -->
      <div class="flex justify-end space-x-3 p-4 px-6 mb-4">
        <button 
          @click="closeModal" 
          class="px-6 py-3 text-gray rounded-md border-2 border-accent2 hover:bg-accent2 hover:text-white transition-colors duration-200">
          Annuler
        </button>
        <button 
          @click="handleSave" 
          class="px-6 py-3 bg-white text-gray border-2 border-accent1 rounded-md hover:bg-accent1 hover:text-white transition-colors duration-200">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Les classes Tailwind devraient couvrir la plupart des besoins, 
   mais on peut ajouter des styles spécifiques ici si nécessaire */
</style>