<script setup>
import { useModalStore } from '@/stores/formStore';
import ProfileForm from '@/components/general/ProfileForm.vue';
import ProfileBankingInfos from '@/components/profile/ProfileBankingInfos.vue';
import ProfilePersonnalInfos from '@/components/profile/ProfilePersonnalInfos.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import ProfileSchoolInfos from '@/components/profile/ProfileSchoolInfos.vue';
import { showDelete } from '@/utils/sweetAlert';
import { showSuccess, showError } from '@/utils/toast';

// Récupérer le store modal
const modalStore = useModalStore();

// Gérer la sauvegarde des données en fonction du type de modal
async function handleSave(data) {
  try {
    let result;
    
    switch (modalStore.modalType) {
      case 'personalInfo':
        // Ici vous feriez normalement un appel API
        // Pour l'instant, simulons une mise à jour directe
        console.log('Saving personal info:', data);
        // Afficher une notification de succès
        showSuccess('Informations personnelles', 'Vos informations personnelles ont été mises à jour avec succès.');
        break;
        
      case 'schoolInfo':
        console.log('Saving school info:', data);
        showSuccess('Informations scolaires', 'Vos informations scolaires ont été mises à jour avec succès.');
        break;
        
      case 'bankingInfo':
        console.log('Saving banking info:', data);
        showSuccess('Informations bancaires', 'Vos informations bancaires ont été mises à jour avec succès.');
        break;
        
      case 'changePassword':
        // Vérifier que les mots de passe correspondent
        if (data.newPassword !== data.confirmPassword) {
          showError('Erreur', 'Les mots de passe ne correspondent pas');
          return; // Ne pas fermer le modal, permettre à l'utilisateur de corriger
        }
        
        // Simuler une vérification côté serveur
        console.log('Changing password:', {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        });
        
        // Dans un cas réel, vous feriez une requête API
        showSuccess('Mot de passe modifié', 'Votre mot de passe a été modifié avec succès!');
        break;
        
      case 'deleteProfile':
        // Vérifier que l'utilisateur a bien tapé "SUPPRIMER"
        if (data.confirmation !== 'SUPPRIMER') {
          showError('Erreur', 'Veuillez taper "SUPPRIMER" pour confirmer la suppression du profil');
          return; // Ne pas fermer le modal
        }
        
        // Demander une confirmation supplémentaire
        result = await showDelete(
          'Supprimer le profil',
          'Cette action est irréversible. Êtes-vous vraiment sûr de vouloir supprimer votre profil ?',
          'Oui, supprimer définitivement'
        );
        
        if (!result.isConfirmed) {
          return; // L'utilisateur a annulé
        }
        
        // Simuler une requête de suppression
        console.log('Deleting profile with password verification:', data.password);
        
        // Dans un cas réel, vous feriez une requête API de suppression
        // et redirigeriez l'utilisateur vers la page d'accueil ou de connexion
        showSuccess('Profil supprimé', 'Votre profil a été supprimé avec succès');
        // Redirection vers la page d'accueil (à implémenter)
        // router.push('/');
        break;
    }
  } catch (error) {
    // Gérer les erreurs potentielles
    showError('Erreur', 'Une erreur est survenue lors de la sauvegarde des données.');
    console.error('Error saving data:', error);
  }
}

// Gérer la mise à jour des données du formulaire
function handleFormDataUpdate(newData) {
  Object.assign(modalStore.formData, newData);
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
    
    <!-- Ajouter le modal ici -->
    <ProfileForm
      :title="modalStore.modalTitle"
      :is-open="modalStore.isModalOpen"
      :form-fields="modalStore.formFields"
      :form-data="modalStore.formData"
      :modal-type="modalStore.modalType"
      @update:is-open="modalStore.closeModal"
      @update:form-data="handleFormDataUpdate"
      @save="handleSave"
    />
  </template>

<style>
</style>