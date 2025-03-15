<script setup>
import { useProfileFormStore } from '@/stores/profileFormStore';
import { useModalStore } from '@/stores/modalStore';
import Modal from '@/components/general/Modal.vue';  // Importer le Modal
import ProfileForm from '@/components/profile/ProfileForm.vue';
import ProfileBankingInfos from '@/components/profile/ProfileBankingInfos.vue';
import ProfilePersonnalInfos from '@/components/profile/ProfilePersonnalInfos.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import ProfileSchoolInfos from '@/components/profile/ProfileSchoolInfos.vue';
import { showLoading, closeLoading, showConfirm } from '@/utils/sweetAlert';
import { showSuccess, showError } from '@/utils/toast';

// Récupérer les stores
const formStore = useProfileFormStore();
const modalStore = useModalStore();

// Gérer la sauvegarde des données en fonction du type de modal
async function handleSave(data) {
  try {
    // Afficher l'indicateur de chargement
    showLoading('Traitement en cours...');
    
    // Simuler un délai de traitement côté serveur (1 seconde)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Fermer l'indicateur de chargement
    closeLoading();
    
    // Demander confirmation pour la suppression de profil
    if (formStore.formType === 'deleteProfile') {
      const result = await showConfirm(
        'Confirmation de suppression',
        'Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.',
        'Oui, supprimer',
        'Annuler'
      );
      
      if (!result.isConfirmed) {
        return; // L'utilisateur a annulé
      }
    }
    
    // Traitement spécifique selon le type de formulaire
    let successMessage = '';
    
    switch (formStore.formType) {
      case 'personnalInfo':
        console.log('Saving personal info:', data);
        successMessage = 'Vos informations personnelles ont été mises à jour avec succès.';
        break;
        
      case 'addressInfo':
        console.log('Saving address info:', data);
        successMessage = 'Votre adresse a été mise à jour avec succès.';
        break;
        
      case 'schoolInfo':
        console.log('Saving school info:', data);
        successMessage = 'Vos informations scolaires ont été mises à jour avec succès.';
        break;
        
      case 'bankingInfo':
        console.log('Saving banking info:', data);
        successMessage = 'Vos informations bancaires ont été mises à jour avec succès.';
        break;
        
      case 'transactionInfo':
        console.log('Saving transaction:', data);
        successMessage = data.id ? 'Transaction mise à jour avec succès.' : 'Transaction ajoutée avec succès.';
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
        
      default:
        successMessage = 'Vos modifications ont été enregistrées avec succès.';
    }
    
    // Afficher le toast de succès standardisé
    showSuccess(successMessage);
    
    // Fermer le modal après traitement
    modalStore.closeModal();
    formStore.resetForm();
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
  formStore.resetForm();
}
</script>

<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">Mon profil</h1>
      
      <ProfilePreview></ProfilePreview>
      <ProfilePersonnalInfos></ProfilePersonnalInfos>
      
      <!-- Section avec informations scolaires et bancaires côte à côte -->
      <div class="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 max-w-screen-lg mx-auto">
        <ProfileSchoolInfos></ProfileSchoolInfos>
        <ProfileBankingInfos></ProfileBankingInfos>
      </div>
      
      <!-- Modal et formulaire séparés -->
      <Modal :isOpen="modalStore.isOpen" @close="handleClose">
        <ProfileForm
          :title="formStore.formTitle"
          :formFields="formStore.formFields"
          :formData="formStore.formData"
          :formType="formStore.formType"
          @close="handleClose"
          @save="handleSave"
        />
      </Modal>
    </div>
</template>

<style>
</style>