import Swal from 'sweetalert2';

const colors = {
  success: '#00EC86', // accent1
  error: '#FF6B6B',   // accent2
  warning: '#FFA500',
  info: '#3498db',
  gray: '#333333'
};

// config
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

// General Popup
export const showPopup = ({
  title = '',
  text = '',
  icon = 'info',
  confirmButtonText = 'OK',
  cancelButtonText = 'Annuler',
  showCancelButton = false,
  timer = null,
  callback = null,
  options = {}
}) => {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon,
    confirmButtonText,
    cancelButtonText,
    showCancelButton,
    timer,
    ...options
  }).then((result) => {
    if (callback) {
      callback(result);
    }
    return result;
  });
};

export const showInfoPopup = ({title, text, options = {}, callback}) => {
  return showPopup({
    title,
    text,
    icon: 'infos',
    ...options,
    callback
  });
};

export const showWarningPopup = ({
  title = 'Attention !',
  text = '',
  options = {},
  callback = null
}) => {
  return showPopup({
    title,
    text,
    icon: 'warning',
    ...options,
    callback
  });
};

// Confirmation popup
export const showConfirmPopup = ({
  title = 'Êtes-vous sûr ?',
  text = 'Cette action est irréversible !',
  confirmButtonText = 'Confirmer',
  cancelButtonText = 'Annuler',
  callback = null,
  options = {}
}) => {
  return showPopup({
    title,
    text,
    icon: 'question',
    confirmButtonText,
    cancelButtonText,
    showCancelButton: true,
    callback,
    ...options
  });
};

export const showDeletePopup = ({
  title = 'Êtes-vous sûr ?',
  text = 'Cette action est irréversible !',
  confirmButtonText = 'Oui, supprimer',
  cancelButtonText = 'Annuler',
  callback = null,
  options = {}
}) => {
  return showPopup({
    title,
    text,
    icon: 'question',
    confirmButtonText,
    cancelButtonText,
    showCancelButton: true,
    callback,
    ...options
  });
};


export const showLoadingPopup = ({
  title = 'Chargement en cours...',
  options = {}}) => {
    return showPopup({
      title,
      icon: 'loading',
      showCancelButton: true,
      ...options
    });
};


export const showSuccessPopup = ({
  title = 'Succès !',
  text = '',
  options = {}
}) => {
  return showPopup({
    title,
    text,
    icon: 'success',
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



export const closeLoading = () => {
  Swal.close();
};

export default Swal; 