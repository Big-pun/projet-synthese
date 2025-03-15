import * as SwalUtils from '@/utils/sweetAlert';

export default {
  install: (app) => {
    // Ajouter toutes les fonctions de l'utilitaire SweetAlert à l'instance Vue
    app.config.globalProperties.$swal = SwalUtils;
    
    // Ajouter également les fonctions individuelles pour un accès plus direct
    app.config.globalProperties.$showSuccess = SwalUtils.showSuccess;
    app.config.globalProperties.$showError = SwalUtils.showError;
    app.config.globalProperties.$showInfo = SwalUtils.showInfo;
    app.config.globalProperties.$showWarning = SwalUtils.showWarning;
    app.config.globalProperties.$showConfirm = SwalUtils.showConfirm;
    app.config.globalProperties.$showDelete = SwalUtils.showDelete;
    app.config.globalProperties.$showToast = SwalUtils.showToast;
    app.config.globalProperties.$showForm = SwalUtils.showForm;
  }
};