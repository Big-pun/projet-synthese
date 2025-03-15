<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Institution bancaire -->
      <div class="mb-4">
        <label for="institutionName" class="block text-sm font-medium text-gray-700 mb-1">
          Institution bancaire
        </label>
        <input 
          type="text" 
          id="institutionName" 
          v-model="formData.institutionName"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-red-500': v$.institutionName.$error }"
        />
        <div v-if="v$.institutionName.$error" class="text-red-500 text-sm mt-1">
          {{ v$.institutionName.$errors[0].$message }}
        </div>
      </div>
      
      <!-- Informations du compte -->
      <div class="mb-4">
        <label for="accountInfo" class="block text-sm font-medium text-gray-700 mb-1">
          Informations du compte
        </label>
        <input 
          type="text" 
          id="accountInfo" 
          v-model="formData.accountInfo"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-red-500': v$.accountInfo.$error }"
        />
        <div v-if="v$.accountInfo.$error" class="text-red-500 text-sm mt-1">
          {{ v$.accountInfo.$errors[0].$message }}
        </div>
      </div>
      
      <!-- Informations de prêt -->
      <div class="mb-4">
        <label for="loanInfo" class="block text-sm font-medium text-gray-700 mb-1">
          Informations de prêt
        </label>
        <textarea 
          id="loanInfo" 
          v-model="formData.loanInfo"
          class="w-full px-3 py-2 border rounded-md"
          rows="3"
          :class="{ 'border-red-500': v$.loanInfo.$error }"
        ></textarea>
        <div v-if="v$.loanInfo.$error" class="text-red-500 text-sm mt-1">
          {{ v$.loanInfo.$errors[0].$message }}
        </div>
      </div>
      
      <!-- Autres informations -->
      <div class="mb-4">
        <label for="other" class="block text-sm font-medium text-gray-700 mb-1">
          Autres informations
        </label>
        <textarea 
          id="other" 
          v-model="formData.other"
          class="w-full px-3 py-2 border rounded-md"
          rows="3"
        ></textarea>
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
import { ref, reactive, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const props = defineProps({
  title: {
    type: String,
    default: 'Éditer mes informations bancaires'
  },
  bankingData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['save', 'cancel']);

// État du formulaire
const formData = reactive({
  institutionName: '',
  accountInfo: '',
  loanInfo: '',
  other: ''
});

const isSubmitting = ref(false);

// Charger les données initiales
function loadBankingData() {
  if (props.bankingData) {
    formData.institutionName = props.bankingData.institutionName || '';
    formData.accountInfo = props.bankingData.accountInfo || '';
    formData.loanInfo = props.bankingData.loanInfo || '';
    formData.other = props.bankingData.other || '';
  }
}

// Règles de validation
const rules = computed(() => ({
  institutionName: { 
    required: helpers.withMessage('L\'institution bancaire est requise', required) 
  },
  accountInfo: { 
    required: helpers.withMessage('Les informations du compte sont requises', required) 
  },
  loanInfo: {
    // Peut être facultatif, mais nous le rendons obligatoire ici pour l'exemple
    required: helpers.withMessage('Les informations de prêt sont requises', required)
  }
}));

// Initialiser Vuelidate
const v$ = useVuelidate(rules, formData);

// Charger les données initiales au montage
loadBankingData();

// Surveiller les changements de bankingData pour recharger les données
watch(() => props.bankingData, () => {
  loadBankingData();
}, { deep: true });

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
      institutionName: formData.institutionName,
      accountInfo: formData.accountInfo,
      loanInfo: formData.loanInfo,
      other: formData.other
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script> 