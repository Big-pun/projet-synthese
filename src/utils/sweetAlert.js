/**
 * Utilitaire pour SweetAlert2
 * Fournit des fonctions prédéfinies pour différents types d'alertes
 */

import Swal from 'sweetalert2';

// Couleurs personnalisées pour correspondre à votre thème
const colors = {
  success: '#00EC86', // accent1
  error: '#FF6B6B',   // accent2
  warning: '#FFA500',
  info: '#3498db',
  gray: '#333333'     // gray de votre thème
};

// Configuration de base pour toutes les alertes
const baseConfig = {
  confirmButtonColor: colors.success,
  cancelButtonColor: colors.error,
  focusConfirm: false,
  customClass: {
    title: 'font-roboto',
    content: 'font-roboto',
    confirmButton: 'font-roboto',
    cancelButton: 'font-roboto'
  }
};

// /**
//  * Affiche une alerte de succès
//  * @param {string} title - Titre de l'alerte
//  * @param {string} text - Texte de l'alerte
//  * @param {Object} options - Options supplémentaires
//  * @returns {Promise} Promesse de SweetAlert2
//  */
// export const showSuccess = (title, text, options = {}) => {
//   return Swal.fire({
//     ...baseConfig,
//     title,
//     text,
//     icon: 'success',
//     ...options
//   });
// };

// /**
//  * Affiche une alerte d'erreur
//  * @param {string} title - Titre de l'alerte
//  * @param {string} text - Texte de l'alerte
//  * @param {Object} options - Options supplémentaires
//  * @returns {Promise} Promesse de SweetAlert2
//  */
// export const showError = (title, text, options = {}) => {
//   return Swal.fire({
//     ...baseConfig,
//     title,
//     text,
//     icon: 'error',
//     ...options
//   });
// };

/**
 * Affiche une alerte d'information
 * @param {string} title - Titre de l'alerte
 * @param {string} text - Texte de l'alerte
 * @param {Object} options - Options supplémentaires
 * @returns {Promise} Promesse de SweetAlert2
 */
export const showInfo = (title, text, options = {}) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: 'info',
    ...options
  });
};

/**
 * Affiche une alerte d'avertissement
 * @param {string} title - Titre de l'alerte
 * @param {string} text - Texte de l'alerte
 * @param {Object} options - Options supplémentaires
 * @returns {Promise} Promesse de SweetAlert2
 */
export const showWarning = (title, text, options = {}) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: 'warning',
    ...options
  });
};

/**
 * Affiche une boîte de dialogue de confirmation
 * @param {string} title - Titre de la confirmation
 * @param {string} text - Texte de la confirmation
 * @param {string} confirmButtonText - Texte du bouton de confirmation
 * @param {string} cancelButtonText - Texte du bouton d'annulation
 * @param {Object} options - Options supplémentaires
 * @returns {Promise} Promesse de SweetAlert2
 */
export const showConfirm = (
  title, 
  text, 
  confirmButtonText = 'Confirmer', 
  cancelButtonText = 'Annuler', 
  options = {}
) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    ...options
  });
};

/**
 * Affiche une boîte de dialogue pour la suppression
 * @param {string} title - Titre de la confirmation
 * @param {string} text - Texte de la confirmation
 * @param {string} confirmButtonText - Texte du bouton de confirmation
 * @param {Object} options - Options supplémentaires
 * @returns {Promise} Promesse de SweetAlert2
 */
export const showDelete = (
  title = 'Êtes-vous sûr ?', 
  text = 'Cette action est irréversible !', 
  confirmButtonText = 'Oui, supprimer', 
  options = {}
) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Annuler',
    ...options
  });
};

/**
 * Affiche un toast de notification
 * @param {string} title - Titre du toast
 * @param {string} icon - Icône du toast (success, error, warning, info)
 * @param {Object} options - Options supplémentaires
 * @returns {Promise} Promesse de SweetAlert2
 */
export const showToast = (title, icon = 'success', options = {}) => {
  return Swal.fire({
    ...baseConfig,
    title,
    icon,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    ...options
  });
};

/**
 * Affiche un indicateur de chargement
 * @param {string} title - Titre du chargement
 * @param {Object} options - Options supplémentaires
 * @returns {Promise} Promesse de SweetAlert2
 */
export const showLoading = (title = 'Chargement en cours...', options = {}) => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
    ...options
  });
};

/**
 * Affiche un formulaire personnalisé
 * @param {string} title - Titre du formulaire
 * @param {string} html - Contenu HTML du formulaire
 * @param {Function} preConfirm - Fonction de validation avant confirmation
 * @param {Object} options - Options supplémentaires
 * @returns {Promise} Promesse de SweetAlert2
 */
export const showForm = (title, html, preConfirm, options = {}) => {
  return Swal.fire({
    ...baseConfig,
    title,
    html,
    showCancelButton: true,
    confirmButtonText: 'Enregistrer',
    cancelButtonText: 'Annuler',
    preConfirm,
    ...options
  });
};

// Fermer l'indicateur de chargement
export const closeLoading = () => {
  Swal.close();
};

// Exporter l'instance Swal pour les cas personnalisés
export default Swal; 