import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators';
import { computed } from 'vue';

export const formFields = {
  personnalInfo: [
    { key: 'firstName', label: 'Prénom', type: 'text' },
    { key: 'lastName', label: 'Nom', type: 'text' },
    { key: 'birthDate', label: 'Date de naissance', type: 'date' },
    { key: 'phone', label: 'Téléphone', type: 'tel' },
    { key: 'email', label: 'Courriel', type: 'email' },
    { key: 'password', label: 'Mot de passe', type: 'password' }
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
  transactionInfo: [
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'category', label: 'Catégorie', type: 'text' },
    { key: 'amount', label: 'Montant', type: 'number' },
    { key: 'type', label: 'Type', type: 'select', options: [
      { value: 'Revenue', label: 'Revenu' },
      { value: 'Expense', label: 'Dépense' }
    ]},
    { key: 'isDone', label: 'Terminé', type: 'checkbox' },
    { key: 'startDate', label: 'Date de début', type: 'date' },
    { key: 'endDate', label: 'Date de fin', type: 'date' },
    { key: 'frequency', label: 'Fréquence (jours)', type: 'number' }
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

export function generateValidationRules(formType, formData = {}) {
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
      rules.password = { 
        required: helpers.withMessage('Le mot de passe est requis.', required),
        minLength: helpers.withMessage('Le mot de passe doit contenir au moins 8 caractères.', minLength(8))
      };
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

    case 'transactionInfo':
      rules.description = { required: helpers.withMessage('La description est requise.', required) };
      rules.category = { required: helpers.withMessage('La catégorie est requise.', required) };
      rules.amount = { required: helpers.withMessage('Le montant est requis.', required) };
      rules.type = { required: helpers.withMessage('Le type est requis.', required) };
      rules.startDate = { required: helpers.withMessage('La date de début est requise.', required) };
      break;

    case 'changePassword':
      rules.currentPassword = { required: helpers.withMessage('Le mot de passe actuel est requis.', required) };
      rules.newPassword = { 
        required: helpers.withMessage('Le nouveau mot de passe est requis.', required),
        minLength: helpers.withMessage('Le mot de passe doit contenir au moins 8 caractères.', minLength(8))
      };
      rules.confirmPassword = { 
        required: helpers.withMessage('La confirmation du mot de passe est requise.', required),
        sameAsPassword: helpers.withMessage('Les mots de passe ne correspondent pas.', sameAs(computed(() => formData.newPassword)))
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
    transactionInfo: 'Éditer les transactions',
    changePassword: 'Changer le mot de passe',
    deleteProfile: 'Supprimer le profil'
  };
  return titles[formType] || 'Formulaire';
} 