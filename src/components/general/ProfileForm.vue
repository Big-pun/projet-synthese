<script setup>
import { defineEmits, ref, watch } from 'vue';

// Définition des props
const props = defineProps({
  title: String,
  isOpen: Boolean,
  formFields: Array,
  formData: Object,
  modalType: String
});

// Émissions d'événements
const emit = defineEmits(['update:isOpen', 'save']);

// Données locales
const localFormData = ref({});
const passwordVisibility = ref({});

// Initialisation des données locales à partir des props
watch(() => props.formData, (newVal) => {
  if (newVal) {
    localFormData.value = { ...newVal };
  }
}, { immediate: true, deep: true });

// Initialisation de la visibilité des mots de passe
watch(() => props.formFields, (newFields) => {
  if (newFields) {
    newFields.forEach(field => {
      if (field.type === 'password') {
        passwordVisibility.value[field.key] = false;
      }
    });
  }
}, { immediate: true });

// Surveillance de modalType pour le débogage
watch(() => props.modalType, (newVal) => {
  console.log('modalType:', newVal);
}, { immediate: true });

// Fonctions liées à l'interaction utilisateur
function closeModal() {
  emit('update:isOpen', false);
}

function handleSave() {
  emit('save', localFormData.value);
  closeModal();
}

// Gestion de la visibilité des mots de passe
function togglePasswordVisibility(key) {
  passwordVisibility.value[key] = !passwordVisibility.value[key];
}

// Déterminer le type de champ en fonction de la visibilité
function getFieldType(field) {
  if (field.type === 'password') {
    return passwordVisibility.value[field.key] ? 'text' : 'password';
  }
  return field.type || 'text';
}

// Changer le grid si c'est les personnalInfos, sur mobile, garder le grid-cols-1
function getGridPersonnalInfo(modalType) {
  if (modalType === 'personnalInfo' && window.innerWidth > 768) {
    return 'grid md:grid-cols-2 grid-cols-1';
  }
  return 'grid grid-cols-1';
}

// Obtenir la classe CSS pour l'icône d'œil en fonction de la visibilité
function getEyeIconClass(key) {
  return passwordVisibility.value[key] ? 'text-accent1 hover:text-accent1' : 'text-accent2 hover:text-accent2';
}

// Fonction pour basculer la visibilité de tous les mots de passe
function toggleAllPasswordsVisibility() {
  for (const key in passwordVisibility.value) {
    passwordVisibility.value[key] = !passwordVisibility.value[key];
  }
}
</script>

<template>
  <div v-if="isOpen" 
       class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-roboto">
    <div class="bg-light-gray max-h-screen overflow-y-auto  max-w-screen-lg rounded-lg shadow-xl mx-4 transition-all duration-200">
      <!-- En-tête du modal avec style cohérent -->
      <div class="flex items-center justify-between p-3 rounded-t-lg bg-gray relative">
        <h3 class="text-white ml-8">{{ title }}</h3>
        
        <!-- Rectangle coloré à droite comme dans les autres composants -->
        <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
             class="absolute right-5 top-0 rounded-b transition-colors duration-200">
          <rect width="36" height="75" fill="#00EC86"/>
        </svg>
      </div>
      
      <!-- Bouton pour basculer la visibilité de tous les mots de passe -->
      <div class="flex justify-end p-4">
        <button 
          v-if="modalType === 'changePassword' || modalType === 'deleteProfile'"
          @click="toggleAllPasswordsVisibility"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200">
          mots de passe
        </button>
      </div>
      
      <!-- Corps du formulaire -->
      <div :class="getGridPersonnalInfo(modalType)" class="px-6 w-full">
        <div v-for="field in formFields" :key="field.key" class="py-1 px-2" >
          <div class="rounded-lg bg-white p-4 flex w-full items-center flex-col sm:flex-row gap-4">
            <label class="block font-medium w-full sm:w-1/3">{{ field.label }}</label>
            <div class="relative w-full sm:w-2/3">
              <input 
                v-model="localFormData[field.key]" 
                :type="getFieldType(field)" 
                class="w-full p-2 border border-gray-300 rounded-md focus:border-accent1 focus:ring-1 focus:ring-accent1 outline-none"
              >
              <!-- Icône d'œil pour les champs de mot de passe -->
              <button 
                v-if="field.type === 'password'" 
                type="button"
                @click="togglePasswordVisibility(field.key)"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                :class="getEyeIconClass(field.key)"
              >
                <!-- Icône œil ouvert quand le mot de passe est visible -->
                <svg v-if="passwordVisibility[field.key]" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <!-- Icône œil barré quand le mot de passe est masqué -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pied du modal avec actions -->
      <div class="flex justify-end space-x-3 p-4 px-6">
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
/* Styles pour les boutons et les transitions */
</style>