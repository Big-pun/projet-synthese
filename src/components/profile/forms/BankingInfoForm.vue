<template>
  <div class="font-roboto bg-light-gray rounded-lg mx-auto">
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
      <!-- Informations bancaires -->
      <div class="mb-4">
        
        <!-- Institution et compte -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-2">
          <!-- Institution bancaire -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label for="institutionName" class="block text-sm font-medium text-gray mb-2 responsive-margin">
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
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label for="accountInfo" class="block text-sm font-medium text-gray mb-2 responsive-margin">
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <!-- Informations de prêt -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label for="loanInfo" class="block text-sm font-medium text-gray mb-2 responsive-margin">
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
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label for="other" class="block text-sm font-medium text-gray mb-2 responsive-margin">
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
          class="px-8 py-3 border-2 border-accent2 bg-white text-gray rounded-md hover:bg-accent2 transition-colors">
          Annuler
        </button>
        <button 
          type="submit" 
          class="px-8 py-3 border-2 border-accent1 bg-white text-gray rounded-md hover:bg-accent1 transition-colors">
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
  bankingData: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: 'Informations bancaires'
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
    // Formatage des données bancaires pour assurer la cohérence
    formData.institutionName = props.bankingData.institutionName || '';
    
    // Formatage du numéro de compte avec la même fonction que lors de la soumission
    formData.accountInfo = props.bankingData.accountInfo ? formatAccountInfo(props.bankingData.accountInfo) : '';
    
    // Formatage des informations de prêt et autres
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
    required: helpers.withMessage('Les informations du compte sont requises', required),
    // Validation du format après saisie par l'utilisateur
    validate: helpers.withMessage(
      'Veuillez entrer un numéro de compte valide (exemple: 123-456-7890)', 
      (value) => {
        // On accepte au moins 6 chiffres
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length >= 6;
      }
    )
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
    // Formater les données avant de les envoyer
    const formattedAccountInfo = formatAccountInfo(formData.accountInfo);
    
    // Émettre l'événement save avec les données du formulaire
    emit('save', {
      institutionName: formData.institutionName,
      accountInfo: formattedAccountInfo,
      loanInfo: formData.loanInfo,
      other: formData.other
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire', error);
  } finally {
    isSubmitting.value = false;
  }
}

// Fonction utilitaire pour formater le numéro de compte
function formatAccountInfo(accountInfo) {
  if (!accountInfo) return '';
  
  const digitsOnly = accountInfo.replace(/\D/g, '');
  if (digitsOnly.length === 10) {
    return `${digitsOnly.substring(0, 3)}-${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6, 10)}`;
  }
  
  // Si aucun chiffre n'est présent, retourner la chaîne originale
  return accountInfo;
}
</script>

<style scoped>

</style> 