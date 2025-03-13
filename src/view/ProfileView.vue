<script setup>
import { useModalStore } from '@/stores/modalStore';
import Modal from '@/components/general/Modal.vue';  // Importer le Modal
import ProfileForm from '@/components/profile/ProfileForm.vue';
import ProfileBankingInfos from '@/components/profile/ProfileBankingInfos.vue';
import ProfilePersonnalInfos from '@/components/profile/ProfilePersonnalInfos.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import ProfileSchoolInfos from '@/components/profile/ProfileSchoolInfos.vue';
import { showLoading, closeLoading } from '@/utils/sweetAlert';
import { showSuccess, showError } from '@/utils/toast';

// Récupérer le store modal
const modalStore = useModalStore();

// Gérer la sauvegarde des données en fonction du type de modal
async function handleSave(data) {
  try {
    // Validation préalable avant de montrer le chargement
    if (modalStore.modalType === 'changePassword' && data.newPassword !== data.confirmPassword) {
      showError('Les mots de passe ne correspondent pas');
      return;
    }

    if (modalStore.modalType === 'deleteProfile' && data.confirmation !== 'SUPPRIMER') {
      showError('Veuillez taper "SUPPRIMER" pour confirmer la suppression du profil');
      return;
    }

    // Afficher l'indicateur de chargement
    showLoading('Traitement en cours...');
    
    // Simuler un délai de traitement côté serveur (3 secondes)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Fermer l'indicateur de chargement
    closeLoading();
    
    // Traitement spécifique selon le type de formulaire
    let successMessage = '';
    
    switch (modalStore.modalType) {
      case 'personalInfo':
        console.log('Saving personal info:', data);
        successMessage = 'Vos informations personnelles ont été mises à jour avec succès.';
        break;
        
      case 'schoolInfo':
        console.log('Saving school info:', data);
        successMessage = 'Vos informations scolaires ont été mises à jour avec succès.';
        break;
        
      case 'bankingInfo':
        console.log('Saving banking info:', data);
        successMessage = 'Vos informations bancaires ont été mises à jour avec succès.';
        break;
        
      case 'changePassword':
        console.log('Changing password:', {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        });
        successMessage = 'Votre mot de passe a été modifié avec succès!';
        break;
        
      case 'deleteProfile':
        console.log('Deleting profile with password verification:', data.password);
        successMessage = 'Votre profil a été supprimé avec succès';
        break;
    }
    
    // Afficher le toast de succès standardisé
    showSuccess(successMessage);
    
    // Fermer le modal après traitement
    modalStore.closeModal();
  } catch (error) {
    // Fermer l'indicateur de chargement en cas d'erreur
    closeLoading();
    
    // Gérer les erreurs
    showError('Une erreur est survenue lors de la sauvegarde des données.');
    console.error('Error saving data:', error);
  }
}

// Gérer la fermeture du modal
function handleClose() {
  modalStore.closeModal();
}
</script>

<template>
    <p class="font-bold">CONTENU PAGE PROFILE</p>
    <ProfilePreview></ProfilePreview>
    <ProfilePersonnalInfos></ProfilePersonnalInfos>
    
    <!-- Section avec informations scolaires et bancaires côte à côte -->
    <div class="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 max-w-screen-lg mx-auto">
      <ProfileSchoolInfos></ProfileSchoolInfos>
      <ProfileBankingInfos></ProfileBankingInfos>
    </div>
    
    <!-- Modal et formulaire séparés -->
    <Modal :isOpen="modalStore.isModalOpen" @close="handleClose">
      <ProfileForm
        :title="modalStore.modalTitle"
        :form-fields="modalStore.formFields"
        :form-data="modalStore.formData"
        :modal-type="modalStore.modalType"
        @close="handleClose"
        @save="handleSave"
      />
    </Modal>
  </template>

<style>
</style>