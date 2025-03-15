<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Informations personnelles -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3 text-gray-800">Informations personnelles</h3>
        
        <!-- Prénom -->
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input 
            type="text" 
            id="firstName" 
            v-model="formData.firstName"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.firstName.$error }"
          />
          <div v-if="v$.firstName.$error" class="text-red-500 text-sm mt-1">
            {{ v$.firstName.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Nom -->
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input 
            type="text" 
            id="lastName" 
            v-model="formData.lastName"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.lastName.$error }"
          />
          <div v-if="v$.lastName.$error" class="text-red-500 text-sm mt-1">
            {{ v$.lastName.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Date de naissance -->
        <div class="mb-4">
          <label for="birthDate" class="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance
          </label>
          <input 
            type="date" 
            id="birthDate" 
            v-model="formData.birthDate"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.birthDate.$error }"
          />
          <div v-if="v$.birthDate.$error" class="text-red-500 text-sm mt-1">
            {{ v$.birthDate.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Téléphone -->
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input 
            type="tel" 
            id="phone" 
            v-model="formData.phone"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.phone.$error }"
          />
          <div v-if="v$.phone.$error" class="text-red-500 text-sm mt-1">
            {{ v$.phone.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Courriel
          </label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.email.$error }"
          />
          <div v-if="v$.email.$error" class="text-red-500 text-sm mt-1">
            {{ v$.email.$errors[0].$message }}
          </div>
        </div>
      </div>
      
      <!-- Informations d'adresse -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3 text-gray-800">Adresse</h3>
        
        <!-- Type d'adresse -->
        <div class="mb-4">
          <label for="addressType" class="block text-sm font-medium text-gray-700 mb-1">
            Type d'adresse
          </label>
          <select 
            id="addressType" 
            v-model="formData.addressType"
            @change="handleAddressTypeChange"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.addressType.$error }"
          >
            <option value="PERSONAL">Personnelle</option>
            <option value="WORK">Professionnelle</option>
          </select>
          <div v-if="v$.addressType.$error" class="text-red-500 text-sm mt-1">
            {{ v$.addressType.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Numéro de rue -->
        <div class="mb-4">
          <label for="streetNumber" class="block text-sm font-medium text-gray-700 mb-1">
            Numéro de rue
          </label>
          <input 
            type="text" 
            id="streetNumber" 
            v-model="formData.streetNumber"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.streetNumber.$error }"
          />
          <div v-if="v$.streetNumber.$error" class="text-red-500 text-sm mt-1">
            {{ v$.streetNumber.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Nom de rue -->
        <div class="mb-4">
          <label for="streetName" class="block text-sm font-medium text-gray-700 mb-1">
            Nom de rue
          </label>
          <input 
            type="text" 
            id="streetName" 
            v-model="formData.streetName"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.streetName.$error }"
          />
          <div v-if="v$.streetName.$error" class="text-red-500 text-sm mt-1">
            {{ v$.streetName.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Ville -->
        <div class="mb-4">
          <label for="city" class="block text-sm font-medium text-gray-700 mb-1">
            Ville
          </label>
          <input 
            type="text" 
            id="city" 
            v-model="formData.city"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.city.$error }"
          />
          <div v-if="v$.city.$error" class="text-red-500 text-sm mt-1">
            {{ v$.city.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Province -->
        <div class="mb-4">
          <label for="province" class="block text-sm font-medium text-gray-700 mb-1">
            Province
          </label>
          <select 
            id="province" 
            v-model="formData.province"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.province.$error }"
          >
            <option v-for="province in provinces" :key="province.value" :value="province.value">
              {{ province.label }}
            </option>
          </select>
          <div v-if="v$.province.$error" class="text-red-500 text-sm mt-1">
            {{ v$.province.$errors[0].$message }}
          </div>
        </div>
        
        <!-- Pays -->
        <div class="mb-4">
          <label for="country" class="block text-sm font-medium text-gray-700 mb-1">
            Pays
          </label>
          <select 
            id="country" 
            v-model="formData.country"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': v$.country.$error }"
          >
            <option value="CA">Canada</option>
          </select>
          <div v-if="v$.country.$error" class="text-red-500 text-sm mt-1">
            {{ v$.country.$errors[0].$message }}
          </div>
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