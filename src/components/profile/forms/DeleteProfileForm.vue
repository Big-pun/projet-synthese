<template>
  <div class="bg-light-gray font-roboto rounded-lg mx-auto max-w-screen-sm">
    <!-- En-tête du formulaire -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0">
      <h2 class="text-xl font-main font-semibold text-white ml-4">{{ title }}</h2>
      
      <!-- Rectangle SVG avec couleur d'accent -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-0 rounded-b">
        <rect width="36" height="75" class="rectangle-fill-hovered" />
      </svg>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4 px-4">
      <!-- Champ de confirmation texte -->
      <div class="mb-4">
        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label for="confirmation" class="block text-sm font-medium text-gray sm:responsive-margin">
            Tapez "SUPPRIMER" pour confirmer
          </label>
          <input 
            type="text" 
            id="confirmation" 
            v-model="formData.confirmation"
            class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
            :class="{ 'border-accent2': v$.confirmation.$error }"
            placeholder="Tapez 'SUPPRIMER' pour confirmer"
          />
        </div>
        <div v-if="v$.confirmation.$error" class="text-accent2 text-sm mt-1 ml-4">
          {{ v$.confirmation.$errors[0].$message }}
        </div>
      </div>

      <!-- Mot de passe -->
      <div class="mb-4">
        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label for="password" class="block text-sm font-medium text-gray sm:responsive-margin">
            Mot de passe
          </label>
          <div class="relative w-full">
            <input 
              :type="passwordVisible ? 'text' : 'password'" 
              id="password" 
              v-model="formData.password"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.password.$error }"
            />
            <button 
              type="button" 
              @click="togglePasswordVisibility" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
        <div v-if="v$.password.$error" class="text-accent2 text-sm mt-1 ml-4">
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>

      <!-- Avertissement -->
      <div class="p-4 bg-white text-accent2 rounded-md mb-4">
        <p class="font-medium">Attention !</p>
        <p>Cette action est irréversible. Tous vos données seront définitivement supprimées.</p>
      </div>

      <!-- Boutons -->
      <div class="flex justify-end space-x-4 p-4">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="px-8 py-3 border-2 border-accent2 bg-white text-gray rounded-md hover:bg-accent2 transition-colors"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          class="px-8 py-3 bg-accent2 bg-opacity-10 border-2 border-accent2 text-gray rounded-md hover:text-white transition-colors"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'En cours...' : 'Supprimer mon profil' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const emit = defineEmits(['save', 'cancel']);

const props = defineProps({
  title: {
    type: String,
    default: 'Supprimer votre profil'
  }
});

// États du formulaire
const formData = reactive({
  confirmation: '',
  password: ''
});

const isSubmitting = ref(false);
const passwordVisible = ref(false);

// Règles de validation
const rules = computed(() => ({
  confirmation: { 
    required: helpers.withMessage('La confirmation est requise', required),
    isSupprimer: helpers.withMessage(
      'Veuillez taper "SUPPRIMER" pour confirmer', 
      (value) => value === 'SUPPRIMER'
    )
  },
  password: { 
    required: helpers.withMessage('Le mot de passe est requis', required)
  }
}));

// Initialiser Vuelidate
const v$ = useVuelidate(rules, formData);

// Méthodes
function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

async function handleSubmit() {
  isSubmitting.value = true;
  
  // Valider le formulaire
  const isValid = await v$.value.$validate();
  
  if (!isValid) {
    isSubmitting.value = false;
    return;
  }
  
  try {
    // Émettre l'événement save avec les données du formulaire
    emit('save', {
      password: formData.password
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script> 