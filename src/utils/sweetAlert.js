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

// /** Desactivé 
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

export const showInfo = (title, text, options = {}) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: 'info',
    ...options
  });
};

export const showWarning = (title, text, options = {}) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: 'warning',
    ...options
  });
};


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