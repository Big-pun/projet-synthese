<template>
  <div class="font-roboto bg-light-gray rounded-lg mx-auto">
    <!-- En-tête du formulaire -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0">
      <h2 class="text-xl font-semibold text-white ml-4">{{ title }}</h2>
      
      <!-- Rectangle SVG avec couleur d'accent -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-0 rounded-b">
        <rect width="36" height="75" class="rectangle-fill-hovered" />
      </svg>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4 px-4">
      <!-- Informations bancaires -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3 text-gray">RENSEIGNEMENTS BANCAIRES</h3>
        <div class="h-1 w-full bg-accent1 mb-6"></div>
        
        <!-- Institution et compte -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
          <!-- Institution bancaire -->
          <div>
            <label for="institutionName" class="block text-sm font-medium text-gray mb-2">
              Institution
            </label>
            <input 
              type="text" 
              id="institutionName" 
              v-model="formData.institutionName"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.institutionName.$error }"
            />
            <div v-if="v$.institutionName.$error" class="text-accent2 text-sm mt-1">
              {{ v$.institutionName.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Informations du compte -->
          <div>
            <label for="accountInfo" class="block text-sm font-medium text-gray mb-2">
              Compte
            </label>
            <input 
              type="text" 
              id="accountInfo" 
              v-model="formData.accountInfo"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.accountInfo.$error }"
            />
            <div v-if="v$.accountInfo.$error" class="text-accent2 text-sm mt-1">
              {{ v$.accountInfo.$errors[0].$message }}
            </div>
          </div>
        </div>
        
        <!-- Prêts et autres -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <!-- Informations de prêt -->
          <div>
            <label for="loanInfo" class="block text-sm font-medium text-gray mb-2">
              Prêts
            </label>
            <textarea 
              id="loanInfo" 
              v-model="formData.loanInfo"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              rows="3"
              :class="{ 'border-accent2': v$.loanInfo.$error }"
            ></textarea>
            <div v-if="v$.loanInfo.$error" class="text-accent2 text-sm mt-1">
              {{ v$.loanInfo.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Autres informations -->
          <div>
            <label for="other" class="block text-sm font-medium text-gray mb-2">
              Autres
            </label>
            <textarea 
              id="other" 
              v-model="formData.other"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Boutons d'action -->
      <div class="flex justify-end space-x-4 mt-8">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="px-8 py-3 border border-accent2 text-accent2 rounded-md hover:bg-accent2 hover:text-white transition-colors">
          Annuler
        </button>
        <button 
          type="submit" 
          class="px-8 py-3 border border-accent1 bg-white text-accent1 rounded-md hover:bg-accent1 hover:text-white transition-colors">
          Enregistrer
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

<style scoped>
.rectangle-fill-hovered {
  fill: #00EC86;
  transition: fill 0.2s ease;
}

.text-gray {
  color: #333333;
}

.bg-gray {
  background-color: #333333;
}

.bg-light-gray {
  background-color: #F5F5F5;
}

.bg-accent1 {
  background-color: #00EC86;
}

.border-accent1 {
  border-color: #00EC86;
}

.text-accent2 {
  color: #F74949;
}

.border-accent2 {
  border-color: #F74949;
}
</style> 