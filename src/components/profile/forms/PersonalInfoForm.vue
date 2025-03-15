<template>
  <div class="bg-light-gray font-roboto rounded-lg mx-auto">
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
      <!-- Informations personnelles -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3 text-gray">Informations personnelles</h3>
        
        <!-- Grille pour prénom et nom -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-2">
          <!-- Prénom -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label for="firstName" class="block text-sm font-medium text-gray responsive-margin">
              Prénom
            </label>
            <input 
              type="text" 
              id="firstName" 
              v-model="formData.firstName"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.firstName.$error }"
            />
            <div v-if="v$.firstName.$error" class="text-accent2 text-sm mt-1">
              {{ v$.firstName.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Nom -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label for="lastName" class="block text-sm font-medium text-gray responsive-margin">
              Nom
            </label>
            <input 
              type="text" 
              id="lastName" 
              v-model="formData.lastName"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.lastName.$error }"
            />
            <div v-if="v$.lastName.$error" class="text-accent2 text-sm mt-1">
              {{ v$.lastName.$errors[0].$message }}
            </div>
          </div>
        </div>
        
        <!-- Grille pour date de naissance et téléphone -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <!-- Date de naissance -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label for="birthDate" class="block text-sm font-medium text-gray responsive-margin">
              Date de naissance
            </label>
            <input 
              type="date" 
              id="birthDate" 
              v-model="formData.birthDate"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.birthDate.$error }"
            />
            <div v-if="v$.birthDate.$error" class="text-accent2 text-sm mt-1">
              {{ v$.birthDate.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Téléphone -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label for="phone" class="block text-sm font-medium text-gray responsive-margin">
              Téléphone
            </label>
            <input 
              type="tel" 
              id="phone" 
              v-model="formData.phone"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.phone.$error }"
            />
            <div v-if="v$.phone.$error" class="text-accent2 text-sm mt-1">
              {{ v$.phone.$errors[0].$message }}
            </div>
          </div>
        </div>
        
        <!-- Email -->
        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label for="email" class="block text-sm font-medium text-gray responsive-margin">
            Courriel
          </label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
            :class="{ 'border-accent2': v$.email.$error }"
          />
          <div v-if="v$.email.$error" class="text-accent2 text-sm mt-1">
            {{ v$.email.$errors[0].$message }}
          </div>
        </div>
      </div>
      
      <!-- Informations d'adresse -->
      <div class="mb-6">
        <!-- En-tête de section avec type d'adresse intégré -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <h3 class="text-lg font-medium text-gray">ADRESSE</h3>
          </div>
          <div class="relative">
            <select 
              id="addressType" 
              v-model="formData.addressType"
              @change="handleAddressTypeChange"
              class="w-48 px-3 py-2 border border-accent1 rounded-md focus:border-accent1 outline-none bg-white text-gray"
              :class="{ 'border-accent2': v$.addressType.$error }"
            >
              <option value="PERSONAL">Personnelle</option>
              <option value="WORK">Professionnelle</option>
            </select>
            <div v-if="v$.addressType.$error" class="absolute text-accent2 text-sm mt-1">
              {{ v$.addressType.$errors[0].$message }}
            </div>
          </div>
        </div>
        
        <!-- Grille pour les informations d'adresse -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pb-2">
          <!-- Numéro de rue -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label for="streetNumber" class="block text-sm font-medium text-gray responsive-margin">
              Numéro de rue
            </label>
            <input 
              type="text" 
              id="streetNumber" 
              v-model="formData.streetNumber"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.streetNumber.$error }"
            />
            <div v-if="v$.streetNumber.$error" class="text-accent2 text-sm mt-1">
              {{ v$.streetNumber.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Nom de rue -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label for="streetName" class="block text-sm font-medium text-gray responsive-margin">
              Nom de rue
            </label>
            <input 
              type="text" 
              id="streetName" 
              v-model="formData.streetName"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.streetName.$error }"
            />
            <div v-if="v$.streetName.$error" class="text-accent2 text-sm mt-1">
              {{ v$.streetName.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Ville -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label for="city" class="block text-sm font-medium text-gray responsive-margin">
              Ville
            </label>
            <input 
              type="text" 
              id="city" 
              v-model="formData.city"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.city.$error }"
            />
            <div v-if="v$.city.$error" class="text-accent2 text-sm mt-1">
              {{ v$.city.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Province -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label for="province" class="block text-sm font-medium text-gray responsive-margin">
              Province
            </label>
            <select 
              id="province" 
              v-model="formData.province"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.province.$error }"
            >
              <option value="">Sélectionnez une option</option>
              <option v-for="province in provinces" :key="province.value" :value="province.value">
                {{ province.label }}
              </option>
            </select>
            <div v-if="v$.province.$error" class="text-accent2 text-sm mt-1">
              {{ v$.province.$errors[0].$message }}
            </div>
          </div>
        </div>
          
          <!-- Pays -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label for="country" class="block text-sm font-medium text-gray responsive-margin">
              Pays
            </label>
            <select 
              id="country" 
              v-model="formData.country"
              class="w-full px-3 py-2 border border-accent1 rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.country.$error }"
            >
              <option value="CA">Canada</option>
            </select>
            <div v-if="v$.country.$error" class="text-accent2 text-sm mt-1">
              {{ v$.country.$errors[0].$message }}
            </div>
          </div>
      </div>
      
      <!-- Boutons d'action -->
      <div class="flex justify-end space-x-4 p-4">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="px-8 py-3 border-2 border-accent2 text-accent2 rounded-md hover:bg-accent2 hover:text-white transition-colors">
          Annuler
        </button>
        <button 
          type="submit" 
          class="px-8 py-3 border-2 border-accent1 text-accent1 rounded-md hover:bg-accent1 hover:text-white transition-colors">
          Enregistrer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

const props = defineProps({
  title: {
    type: String,
    default: 'Éditer mes informations personnelles'
  },
  userData: {
    type: Object,
    default: () => ({})
  },
  userAddresses: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['save', 'cancel']);

// Provinces disponibles
const provinces = [
  { value: 'QC', label: 'Québec' },
  { value: 'ON', label: 'Ontario' },
  { value: 'BC', label: 'Colombie-Britannique' },
  { value: 'AB', label: 'Alberta' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NB', label: 'Nouveau-Brunswick' },
  { value: 'NS', label: 'Nouvelle-Écosse' },
  { value: 'PE', label: 'Île-du-Prince-Édouard' },
  { value: 'NL', label: 'Terre-Neuve-et-Labrador' },
  { value: 'YT', label: 'Yukon' },
  { value: 'NT', label: 'Territoires du Nord-Ouest' },
  { value: 'NU', label: 'Nunavut' }
];

// État du formulaire
const formData = reactive({
  firstName: '',
  lastName: '',
  birthDate: '',
  phone: '',
  email: '',
  addressType: 'PERSONAL',
  streetNumber: '',
  streetName: '',
  city: '',
  province: '',
  country: 'CA'
});

const isSubmitting = ref(false);

// Chargement des données initiales
function loadUserData() {
  if (props.userData) {
    formData.firstName = props.userData.firstName || '';
    formData.lastName = props.userData.lastName || '';
    formData.birthDate = props.userData.birthDate || '';
    formData.phone = props.userData.phone || '';
    formData.email = props.userData.email || '';
    
    // Charger l'adresse par défaut (personnelle)
    loadAddressByType('PERSONAL');
  }
}

// Charger une adresse selon son type
function loadAddressByType(type) {
  const address = props.userAddresses?.find(addr => addr.type === type);
  
  if (address) {
    formData.addressType = type;
    formData.streetNumber = address.streetNumber || '';
    formData.streetName = address.streetName || '';
    formData.city = address.city || '';
    formData.province = address.province || '';
    formData.country = address.country || 'CA';
  } else {
    // Réinitialiser les champs d'adresse si l'adresse n'existe pas
    formData.addressType = type;
    formData.streetNumber = '';
    formData.streetName = '';
    formData.city = '';
    formData.province = '';
    formData.country = 'CA';
  }
}

// Gérer le changement de type d'adresse
function handleAddressTypeChange() {
  loadAddressByType(formData.addressType);
}

// Règles de validation
const rules = computed(() => ({
  firstName: { 
    required: helpers.withMessage('Le prénom est requis', required) 
  },
  lastName: { 
    required: helpers.withMessage('Le nom est requis', required) 
  },
  birthDate: { 
    required: helpers.withMessage('La date de naissance est requise', required) 
  },
  phone: { 
    required: helpers.withMessage('Le numéro de téléphone est requis', required) 
  },
  email: { 
    required: helpers.withMessage('L\'adresse email est requise', required),
    email: helpers.withMessage('Veuillez entrer une adresse email valide', email)
  },
  addressType: { 
    required: helpers.withMessage('Le type d\'adresse est requis', required) 
  },
  streetNumber: { 
    required: helpers.withMessage('Le numéro de rue est requis', required) 
  },
  streetName: { 
    required: helpers.withMessage('Le nom de rue est requis', required) 
  },
  city: { 
    required: helpers.withMessage('La ville est requise', required) 
  },
  province: { 
    required: helpers.withMessage('La province est requise', required) 
  },
  country: { 
    required: helpers.withMessage('Le pays est requis', required) 
  }
}));

// Initialiser Vuelidate
const v$ = useVuelidate(rules, formData);

// Charger les données initiales au montage
loadUserData();

// Surveiller les changements de userData pour recharger les données
watch(() => props.userData, () => {
  loadUserData();
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
    // Préparer les données à envoyer
    const personalData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      phone: formData.phone,
      email: formData.email,
      address: {
        type: formData.addressType,
        streetNumber: formData.streetNumber,
        streetName: formData.streetName,
        city: formData.city,
        province: formData.province,
        country: formData.country
      }
    };
    
    // Émettre l'événement save avec les données du formulaire
    emit('save', personalData);
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>


</style> 