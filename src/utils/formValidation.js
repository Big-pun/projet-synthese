/**
 * Utilitaire de centralisation de la validation des formulaires
 * Contient la définition des champs et les règles de validation pour tous les formulaires de l'application
 */
import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators';
import { computed } from 'vue';

/**
 * Définition de tous les champs de formulaire de l'application
 * Centralise les propriétés comme le label, le type, et les valeurs par défaut
 */
export const formFields = {
  // Champs du formulaire d'informations personnelles
  personnalInfo: [
    { key: 'prenom', label: 'Prénom', type: 'text' },
    { key: 'nom', label: 'Nom', type: 'text' },
    { key: 'dateNaissance', label: 'Date de naissance', type: 'date' },
    { key: 'telephone', label: 'Téléphone', type: 'tel' },
    { key: 'courriel', label: 'Courriel', type: 'email' },
    { key: 'adressePersonnelle', label: 'Adresse personnelle', type: 'text' },
    { key: 'adresseTravail', label: 'Adresse au travail', type: 'text' }
  ],

  // Champs du formulaire d'informations scolaires
  schoolInfo: [
    { key: 'nom', label: 'Nom de l\'établissement', type: 'text' },
    { key: 'domaine', label: 'Domaine d\'études', type: 'text' },
    { key: 'debutProgramme', label: 'Début du programme', type: 'date' },
    { key: 'finProgramme', label: 'Fin du programme', type: 'date' }
  ],

  // Champs du formulaire d'informations bancaires
  bankingInfo: [
    { key: 'institution', label: 'Institution bancaire', type: 'text' },
    { key: 'numeroCarte', label: 'Numéro de carte', type: 'text' },
    { key: 'dateExpiration', label: 'Date d\'expiration', type: 'date' },
    { key: 'codeSecurite', label: 'Code de sécurité', type: 'password' }
  ],

  // Champs du formulaire de changement de mot de passe
  changePassword: [
    { key: 'currentPassword', label: 'Mot de passe actuel', type: 'password' },
    { key: 'newPassword', label: 'Nouveau mot de passe', type: 'password' },
    { key: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password' }
  ],

  // Champs du formulaire de suppression de profil
  deleteProfile: [
    { key: 'confirmation', label: 'Tapez "SUPPRIMER" pour confirmer', type: 'text' },
    { key: 'password', label: 'Mot de passe', type: 'password' }
  ]
};

/**
 * Génère les règles de validation Vuelidate pour un type de formulaire et des données spécifiques
 * @param {String} formType - Type de formulaire
 * @param {Object} formData - Données du formulaire (pour les validations qui dépendent des valeurs)
 * @returns {Object} Règles de validation Vuelidate
 */
export function generateValidationRules(formType, formData = {}) {
  const rules = {};
  
  switch (formType) {
    case 'personnalInfo':
      rules.prenom = { required: helpers.withMessage('Le prénom est requis.', required) };
      rules.nom = { required: helpers.withMessage('Le nom est requis.', required) };
      rules.dateNaissance = { required: helpers.withMessage('La date de naissance est requise.', required) };
      rules.telephone = { required: helpers.withMessage('Le téléphone est requis.', required) };
      rules.courriel = { 
        required: helpers.withMessage('Le courriel est requis.', required),
        email: helpers.withMessage('Veuillez entrer un courriel valide.', email)
      };
      rules.adressePersonnelle = { required: helpers.withMessage('L\'adresse personnelle est requise.', required) };
      rules.adresseTravail = { required: helpers.withMessage('L\'adresse au travail est requise.', required) };
      break;

    case 'schoolInfo':
      rules.nom = { required: helpers.withMessage('Le nom de l\'établissement est requis.', required) };
      rules.domaine = { required: helpers.withMessage('Le domaine d\'études est requis.', required) };
      rules.debutProgramme = { required: helpers.withMessage('La date de début du programme est requise.', required) };
      rules.finProgramme = { required: helpers.withMessage('La date de fin du programme est requise.', required) };
      break;

    case 'bankingInfo':
      rules.institution = { required: helpers.withMessage('L\'institution bancaire est requise.', required) };
      rules.numeroCarte = { required: helpers.withMessage('Le numéro de carte est requis.', required) };
      rules.dateExpiration = { required: helpers.withMessage('La date d\'expiration est requise.', required) };
      rules.codeSecurite = { required: helpers.withMessage('Le code de sécurité est requis.', required) };
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
  
  // S'assurer que tous les champs configurés ont une règle par défaut
  if (formFields[formType]) {
    formFields[formType].forEach(field => {
      if (!rules[field.key]) {
        rules[field.key] = {};
      }
    });
  }
  
  return rules;
}

/**
 * Obtient la configuration des champs pour un type de formulaire spécifique
 * @param {String} formType - Type de formulaire
 * @returns {Array} Configuration des champs du formulaire
 */
export function getFormFields(formType) {
  return formFields[formType] || [];
}

/**
 * Obtient le titre par défaut pour un type de formulaire spécifique
 * @param {String} formType - Type de formulaire
 * @returns {String} Titre du formulaire
 */
export function getFormTitle(formType) {
  const titles = {
    personnalInfo: 'Éditer les informations personnelles',
    schoolInfo: 'Éditer les informations scolaires',
    bankingInfo: 'Éditer les informations bancaires',
    changePassword: 'Changer le mot de passe',
    deleteProfile: 'Supprimer le profil'
  };
  return titles[formType] || 'Formulaire';
} 