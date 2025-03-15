<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Champ de confirmation texte -->
      <div class="mb-4">
        <label for="confirmation" class="block text-sm font-medium text-gray-700 mb-1">
          Confirmation de suppression
        </label>
        <input 
          type="text" 
          id="confirmation" 
          v-model="formData.confirmation"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-red-500': v$.confirmation.$error }"
          placeholder="Tapez 'SUPPRIMER' pour confirmer"
        />
        <div v-if="v$.confirmation.$error" class="text-red-500 text-sm mt-1">
          {{ v$.confirmation.$errors[0].$message }}
        </div>
      </div>

      <!-- Mot de passe -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <div class="relative">
          <input 
            :type="passwordVisible ? 'text' : 'password'" 
            id="password" 
            v-model="formData.password"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.password.$error }"
          />
          <button 
            type="button" 
            @click="togglePasswordVisibility" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
          >
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <div v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>

      <!-- Avertissement -->
      <div class="p-4 bg-red-50 text-red-800 rounded-md mb-4">
        <p class="font-medium">Attention !</p>
        <p>Cette action est irréversible. Tous vos données seront définitivement supprimées.</p>
      </div>

      <!-- Boutons -->
      <div class="flex justify-end space-x-2 mt-6">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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

const props = defineProps({
  title: {
    type: String,
    default: 'Supprimer mon profil'
  }
});

const emit = defineEmits(['save', 'cancel']);

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