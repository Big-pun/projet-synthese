<script setup>
import { ref, shallowRef } from 'vue';
import Modal from '@/components/general/Modal.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import ProfilePersonnalInfos from '@/components/profile/ProfilePersonnalInfos.vue';
import ProfileSchoolInfos from '@/components/profile/ProfileSchoolInfos.vue';
import ProfileBankingInfos from '@/components/profile/ProfileBankingInfos.vue';

// Importer les formulaires
import ChangePasswordForm from '@/components/profile/forms/ChangePasswordForm.vue';
import DeleteProfileForm from '@/components/profile/forms/DeleteProfileForm.vue';
import PersonalInfoForm from '@/components/profile/forms/PersonalInfoForm.vue';
import SchoolInfoForm from '@/components/profile/forms/SchoolInfoForm.vue';
import BankingInfoForm from '@/components/profile/forms/BankingInfoForm.vue';

import { showLoading, closeLoading, showConfirm } from '@/utils/sweetAlert';
import { showSuccess, showError } from '@/utils/toast';
import { mockUser } from '@/mock/userData';

// État local pour le modal et les formulaires
const isModalOpen = ref(false);
const activeForm = shallowRef(null);
const formTitle = ref('');
const formData = ref(null);
const userAddresses = ref(null);

// Fonction pour ouvrir un formulaire spécifique
function openForm(formType, data = null, addresses = null) {
  // Configurer le formulaire actif
  switch (formType) {
    case 'changePassword':
      activeForm.value = ChangePasswordForm;
      formTitle.value = 'Changer votre mot de passe';
      break;
      
    case 'deleteProfile':
      activeForm.value = DeleteProfileForm;
      formTitle.value = 'Supprimer votre profil';
      break;
      
    case 'personnalInfo':
      activeForm.value = PersonalInfoForm;
      formTitle.value = 'Modifier vos informations personnelles';
      break;
      
    case 'schoolInfo':
      activeForm.value = SchoolInfoForm;
      formTitle.value = 'Modifier votre établissement scolaire';
      break;
      
    case 'bankingInfo':
      activeForm.value = BankingInfoForm;
      formTitle.value = 'Modifier vos renseignements bancaires';
      break;
      
    default:
      console.error('Type de formulaire non reconnu:', formType);
      return;
  }
  
  // Définir les données du formulaire
  formData.value = data;
  userAddresses.value = addresses;
  
  // Ouvrir le modal
  isModalOpen.value = true;
}

// Gérer la sauvegarde des données en fonction du type de modal
async function handleSave(data) {
  try {
    // Afficher l'indicateur de chargement
    showLoading('Traitement en cours...');
    
    // Simuler un délai de traitement côté serveur (1 seconde)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Fermer l'indicateur de chargement
    closeLoading();
    
    // Gérer le cas spécial de suppression de profil
    if (activeForm.value === DeleteProfileForm) {
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
    
    if (activeForm.value === PersonalInfoForm) {
      console.log('Saving personal info:', data);
      successMessage = 'Vos informations personnelles ont été mises à jour avec succès.';
    }
    else if (activeForm.value === SchoolInfoForm) {
      console.log('Saving school info:', data);
      successMessage = 'Vos informations scolaires ont été mises à jour avec succès.';
    }
    else if (activeForm.value === BankingInfoForm) {
      console.log('Saving banking info:', data);
      successMessage = 'Vos informations bancaires ont été mises à jour avec succès.';
    }
    else if (activeForm.value === ChangePasswordForm) {
      console.log('Changing password:', data);
      successMessage = 'Votre mot de passe a été modifié avec succès!';
    }
    else if (activeForm.value === DeleteProfileForm) {
      console.log('Deleting profile with password verification:', data.password);
      successMessage = 'Votre profil a été supprimé avec succès';
    }
    else {
      successMessage = 'Vos modifications ont été enregistrées avec succès.';
    }
    
    // Afficher le toast de succès standardisé
    showSuccess(successMessage);
    
    // Fermer le modal après traitement
    isModalOpen.value = false;
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
  isModalOpen.value = false;
}
</script>

<template>
    <div class="container mx-auto px-4 py-8">
      <ProfilePreview @change-password="openForm('changePassword')" @delete-profile="openForm('deleteProfile')"></ProfilePreview>
      <ProfilePersonnalInfos @edit="openForm('personnalInfo', mockUser, mockUser.addresses)"></ProfilePersonnalInfos>
      
      <!-- Section avec informations scolaires et bancaires côte à côte -->
      <div class="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 max-w-screen-lg mx-auto">
        <ProfileSchoolInfos @edit="openForm('schoolInfo', mockUser.schoolDetails)"></ProfileSchoolInfos>
        <ProfileBankingInfos @edit="openForm('bankingInfo', mockUser.bankingDetails)"></ProfileBankingInfos>
      </div>
      
      <!-- Modal avec les formulaires spécifiques -->
      <Modal :isOpen="isModalOpen" @close="handleClose">
        <component 
          :is="activeForm" 
          :title="formTitle"
          :userData="activeForm === PersonalInfoForm ? formData : null" 
          :userAddresses="activeForm === PersonalInfoForm ? userAddresses : null"
          :schoolData="activeForm === SchoolInfoForm ? formData : null"
          :bankingData="activeForm === BankingInfoForm ? formData : null"
          @save="handleSave"
          @cancel="handleClose"
          class="w-full"
        />
      </Modal>
    </div>
</template>

<style>
</style>