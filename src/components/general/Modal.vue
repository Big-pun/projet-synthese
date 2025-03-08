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
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
      <!-- En-tête du modal -->
      <div class="bg-gray rounded-t-lg p-4 text-white">
        <h3 class="font-medium">{{ title }}</h3>
      </div>
      
      <!-- Corps du formulaire -->
      <div class="p-6">
        <div v-for="field in formFields" :key="field.key" class="mb-4">
          <label class="block text-sm font-medium mb-1">{{ field.label }}</label>
          <input 
            v-model="formData[field.key]" 
            :type="field.type || 'text'" 
            class="w-full p-2 border rounded-md"
          >
        </div>
      </div>
      
      <!-- Pied du modal -->
      <div class="flex justify-end space-x-3 p-4 border-t">
        <button 
          @click="closeModal" 
          class="px-4 py-2 text-gray rounded-md border">
          Annuler
        </button>
        <button 
          @click="handleSave" 
          class="px-4 py-2 bg-accent1 text-white rounded-md">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>