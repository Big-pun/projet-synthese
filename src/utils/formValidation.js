import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { computed, watch, ref } from 'vue';

export const formFields = {
  personnalInfo: [
    { key: 'firstName', label: 'Prénom', type: 'text' },
    { key: 'lastName', label: 'Nom', type: 'text' },
    { key: 'birthDate', label: 'Date de naissance', type: 'date' },
    { key: 'phone', label: 'Téléphone', type: 'tel' },
    { key: 'email', label: 'Courriel', type: 'email' },
    
    { key: 'addressSeparator', type: 'separator', label: 'Adresse' },
    
    { key: 'addressType', label: 'Type d\'adresse', type: 'select', options: [
      { value: 'PERSONAL', label: 'Personnel' },
      { value: 'WORK', label: 'Travail' }
    ]},
    
    { key: 'streetNumber', label: 'Numéro de rue', type: 'text', addressField: true },
    { key: 'streetName', label: 'Nom de rue', type: 'text', addressField: true },
    { key: 'city', label: 'Ville', type: 'text', addressField: true },
    { key: 'province', label: 'Province', type: 'select', addressField: true, options: [
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
    ]},
    { key: 'country', label: 'Pays', type: 'select', addressField: true, options: [
      { value: 'CA', label: 'Canada' }
    ]}
  ],
  addressInfo: [
    { key: 'streetNumber', label: 'Numéro de rue', type: 'text' },
    { key: 'streetName', label: 'Nom de rue', type: 'text' },
    { key: 'city', label: 'Ville', type: 'text' },
    { key: 'province', label: 'Province', type: 'select', options: [
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
    ]},
    { key: 'country', label: 'Pays', type: 'select', options: [
      { value: 'CA', label: 'Canada' }
    ]},
    { key: 'type', label: 'Type d\'adresse', type: 'hidden' }
  ],
  schoolInfo: [
    { key: 'schoolName', label: 'Nom de l\'établissement', type: 'text' },
    { key: 'fieldOfStudy', label: 'Domaine d\'études', type: 'text' },
    { key: 'startDate', label: 'Début du programme', type: 'date' },
    { key: 'projectedEndDate', label: 'Fin prévue du programme', type: 'date' }
  ],
  bankingInfo: [
    { key: 'institutionName', label: 'Institution bancaire', type: 'text' },
    { key: 'accountInfo', label: 'Informations du compte', type: 'text' },
    { key: 'loanInfo', label: 'Informations de prêt', type: 'text' },
    { key: 'other', label: 'Autres informations', type: 'text' }
  ],
  changePassword: [
    { key: 'currentPassword', label: 'Mot de passe actuel', type: 'password' },
    { key: 'newPassword', label: 'Nouveau mot de passe', type: 'password' },
    { key: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password' }
  ],
  deleteProfile: [
    { key: 'confirmation', label: 'Tapez "SUPPRIMER" pour confirmer', type: 'text' },
    { key: 'password', label: 'Mot de passe', type: 'password' }
  ]
};

// Fonction qui configure et initialise Vuelidate
export function useFormValidation(formType, formData) {
  // État de validation
  const isSubmitted = ref(false);
  const passwordsMatch = ref(true);
  const shouldCheckPasswordMatch = ref(false);
  
  // Règles de validation
  const validationRules = computed(() => {
    return generateValidationRules(formType.value, formData.value);
  });
  
  // Initialisation de Vuelidate
  const v$ = useVuelidate(validationRules, formData);
  
  // Surveiller les changements de type de formulaire pour réinitialiser
  watch(() => formType.value, () => {
    resetValidation();
    isSubmitted.value = false;
    passwordsMatch.value = true;
    shouldCheckPasswordMatch.value = false;
  });
  
  // Méthodes pour la validation
  function resetValidation() {
    console.log("🔄 Réinitialisation des validations");
    if (v$.value.$reset) {
      v$.value.$reset();
    }
  }
  
  async function validateForm() {
    isSubmitted.value = true;
    
    const isValid = await v$.value.$validate();
    console.log("✅ Résultat de validation de base:", isValid, "Erreurs:", v$.value.$errors);
    
    if (!isValid) {
      v$.value.$errors.forEach(error => {
        console.error(`❌ Erreur dans le champ ${error.$property}:`, error.$message);
      });
      return false;
    }
    
    // Vérifications spécifiques selon le type de formulaire
    if (formType.value === 'changePassword') {
      const match = formData.value.newPassword === formData.value.confirmPassword;
      if (!match) {
        console.error("❌ Les mots de passe ne correspondent pas");
        return false;
      }
    }
    
    return true;
  }
  
  function hasError(fieldName) {
    return isSubmitted.value && v$.value[fieldName] && v$.value[fieldName].$error;
  }
  
  function getErrorMessage(fieldName) {
    if (!v$.value[fieldName]) return '';
    const errors = v$.value[fieldName].$errors;
    return errors.length > 0 ? errors[0].$message : '';
  }
  
  function checkPasswordMatch(newValue, confirmValue) {
    return newValue === confirmValue;
  }
  
  function onPasswordFieldChange(key, value) {
    if (formType.value === 'changePassword' &&
        (key === 'newPassword' || key === 'confirmPassword')) {
      
      if (key === 'confirmPassword' && value.length > 0) {
        shouldCheckPasswordMatch.value = true;
      }
      
      if (formData.value.newPassword && formData.value.confirmPassword) {
        passwordsMatch.value = checkPasswordMatch(
          formData.value.newPassword,
          formData.value.confirmPassword
        );
      }
    }
  }
  
  return {
    v$,
    isSubmitted,
    passwordsMatch,
    shouldCheckPasswordMatch,
    validateForm,
    resetValidation,
    hasError,
    getErrorMessage,
    onPasswordFieldChange
  };
}

// Fonction pour générer les règles de validation
export function generateValidationRules(formType, formData = {}) {
  console.log("🔧 Génération des règles pour:", formType, "avec données:", formData);
  const rules = {};
  
  switch (formType) {
    case 'personnalInfo':
      rules.firstName = { required: helpers.withMessage('Le prénom est requis.', required) };
      rules.lastName = { required: helpers.withMessage('Le nom est requis.', required) };
      rules.birthDate = { required: helpers.withMessage('La date de naissance est requise.', required) };
      rules.phone = { required: helpers.withMessage('Le téléphone est requis.', required) };
      rules.email = { 
        required: helpers.withMessage('Le courriel est requis.', required),
        email: helpers.withMessage('Veuillez entrer un courriel valide.', email)
      };
      
      // Règles pour les champs d'adresse intégrés
      rules.addressType = { required: helpers.withMessage('Le type d\'adresse est requis.', required) };
      rules.streetNumber = { required: helpers.withMessage('Le numéro de rue est requis.', required) };
      rules.streetName = { required: helpers.withMessage('Le nom de rue est requis.', required) };
      rules.city = { required: helpers.withMessage('La ville est requise.', required) };
      rules.province = { required: helpers.withMessage('La province est requise.', required) };
      rules.country = { required: helpers.withMessage('Le pays est requis.', required) };
      break;

    case 'addressInfo':
      rules.streetNumber = { required: helpers.withMessage('Le numéro de rue est requis.', required) };
      rules.streetName = { required: helpers.withMessage('Le nom de rue est requis.', required) };
      rules.city = { required: helpers.withMessage('La ville est requise.', required) };
      rules.province = { required: helpers.withMessage('La province est requise.', required) };
      rules.country = { required: helpers.withMessage('Le pays est requis.', required) };
      rules.type = { required: helpers.withMessage('Le type d\'adresse est requis.', required) };
      break;

    case 'schoolInfo':
      rules.schoolName = { required: helpers.withMessage('Le nom de l\'établissement est requis.', required) };
      rules.fieldOfStudy = { required: helpers.withMessage('Le domaine d\'études est requis.', required) };
      rules.startDate = { required: helpers.withMessage('La date de début du programme est requise.', required) };
      rules.projectedEndDate = { required: helpers.withMessage('La date de fin prévue du programme est requise.', required) };
      break;

    case 'bankingInfo':
      rules.institutionName = { required: helpers.withMessage('L\'institution bancaire est requise.', required) };
      rules.accountInfo = { required: helpers.withMessage('Les informations du compte sont requises.', required) };
      break;

    case 'changePassword':
      rules.currentPassword = { required: helpers.withMessage('Le mot de passe actuel est requis.', required) };
      rules.newPassword = { 
        required: helpers.withMessage('Le nouveau mot de passe est requis.', required),
        minLength: helpers.withMessage('Le mot de passe doit contenir au moins 8 caractères.', minLength(8))
      };
      
      rules.confirmPassword = { 
        required: helpers.withMessage('La confirmation du mot de passe est requise.', required)
      };
      break;

    case 'deleteProfile':
      rules.confirmation = { 
        required: helpers.withMessage('La confirmation est requise.', required),
        matchesDeleteText: helpers.withMessage('Veuillez taper "SUPPRIMER" pour confirmer.', (value) => value === 'SUPPRIMER')
      };
      rules.password = { required: helpers.withMessage('Le mot de passe est requis.', required) };
      break;
  }
  
  // Ajout des règles pour tous les champs définis
  if (formFields[formType]) {
    formFields[formType].forEach(field => {
      if (!rules[field.key]) {
        rules[field.key] = {};
      }
    });
  }
  
  return rules;
}

export function getFormFields(formType) {
  return formFields[formType] || [];
}

export function getFormTitle(formType) {
  const titles = {
    personnalInfo: 'Éditer les informations personnelles',
    addressInfo: 'Éditer les adresses',
    schoolInfo: 'Éditer les informations scolaires',
    bankingInfo: 'Éditer les informations bancaires',
    changePassword: 'Changer le mot de passe',
    deleteProfile: 'Supprimer le profil'
  };
  return titles[formType] || 'Formulaire';
} 