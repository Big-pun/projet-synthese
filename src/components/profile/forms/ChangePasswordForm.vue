<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Mot de passe actuel -->
      <div class="mb-4">
        <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe actuel
        </label>
        <div class="relative">
          <input 
            :type="passwordVisibility.currentPassword ? 'text' : 'password'" 
            id="currentPassword" 
            v-model="formData.currentPassword"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.currentPassword.$error }"
          />
          <button 
            type="button" 
            @click="togglePasswordVisibility('currentPassword')" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
          >
            <i :class="passwordVisibility.currentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <div v-if="v$.currentPassword.$error" class="text-red-500 text-sm mt-1">
          {{ v$.currentPassword.$errors[0].$message }}
        </div>
      </div>

      <!-- Nouveau mot de passe -->
      <div class="mb-4">
        <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">
          Nouveau mot de passe
        </label>
        <div class="relative">
          <input 
            :type="passwordVisibility.newPassword ? 'text' : 'password'" 
            id="newPassword" 
            v-model="formData.newPassword"
            @input="checkPasswordsMatch"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.newPassword.$error }"
          />
          <button 
            type="button" 
            @click="togglePasswordVisibility('newPassword')" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
          >
            <i :class="passwordVisibility.newPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <div v-if="v$.newPassword.$error" class="text-red-500 text-sm mt-1">
          {{ v$.newPassword.$errors[0].$message }}
        </div>
      </div>

      <!-- Confirmer le mot de passe -->
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
          Confirmer le mot de passe
        </label>
        <div class="relative">
          <input 
            :type="passwordVisibility.confirmPassword ? 'text' : 'password'" 
            id="confirmPassword" 
            v-model="formData.confirmPassword"
            @input="checkPasswordsMatch"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.confirmPassword.$error || !passwordsMatch }"
          />
          <button 
            type="button" 
            @click="togglePasswordVisibility('confirmPassword')" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
          >
            <i :class="passwordVisibility.confirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <div v-if="v$.confirmPassword.$error" class="text-red-500 text-sm mt-1">
          {{ v$.confirmPassword.$errors[0].$message }}
        </div>
        <div v-if="!v$.confirmPassword.$error && !passwordsMatch" class="text-red-500 text-sm mt-1">
          Les mots de passe ne correspondent pas
        </div>
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
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'En cours...' : 'Enregistrer' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers, sameAs } from '@vuelidate/validators';

const props = defineProps({
  title: {
    type: String,
    default: 'Changer le mot de passe'
  }
});

const emit = defineEmits(['save', 'cancel']);

// État du formulaire
const formData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// État de visibilité des mots de passe
const passwordVisibility = reactive({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false
});

// État de soumission
const isSubmitting = ref(false);
const passwordsMatch = ref(true);

// Règles de validation
const rules = computed(() => ({
  currentPassword: { 
    required: helpers.withMessage('Le mot de passe actuel est requis', required) 
  },
  newPassword: { 
    required: helpers.withMessage('Le nouveau mot de passe est requis', required),
    minLength: helpers.withMessage(
      'Le mot de passe doit contenir au moins 8 caractères', 
      minLength(8)
    )
  },
  confirmPassword: { 
    required: helpers.withMessage('Veuillez confirmer le mot de passe', required),
    sameAsPassword: helpers.withMessage(
      'Les mots de passe doivent correspondre', 
      sameAs(formData.newPassword)
    )
  }
}));

// Initialiser Vuelidate
const v$ = useVuelidate(rules, formData);

// Méthodes
function togglePasswordVisibility(field) {
  passwordVisibility[field] = !passwordVisibility[field];
}

function checkPasswordsMatch() {
  passwordsMatch.value = formData.newPassword === formData.confirmPassword;
}

async function handleSubmit() {
  isSubmitting.value = true;
  
  // Valider le formulaire
  const isValid = await v$.value.$validate();
  
  if (!isValid || !passwordsMatch.value) {
    isSubmitting.value = false;
    return;
  }
  
  try {
    // Émettre l'événement save avec les données du formulaire
    emit('save', {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script> 