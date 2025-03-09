<script setup>
import { useModalStore } from '@/stores/modalStore';
import Modal from '@/components/general/Modal.vue';
import ProfileBankingInfos from '@/components/profile/ProfileBankingInfos.vue';
import ProfilePersonnalInfos from '@/components/profile/ProfilePersonnalInfos.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import ProfileSchoolInfos from '@/components/profile/ProfileSchoolInfos.vue';

// Récupérer le store modal
const modalStore = useModalStore();

// Gérer la sauvegarde des données en fonction du type de modal
function handleSave(data) {
  switch (modalStore.modalType) {
    case 'personalInfo':
      // Ici vous feriez normalement un appel API
      // Pour l'instant, simulons une mise à jour directe
      console.log('Saving personal info:', data);
      // Si besoin de mettre à jour l'UI, il faudrait propager ces données
      // aux composants enfants ou utiliser un autre store pour les données utilisateur
      break;
    case 'schoolInfo':
      console.log('Saving school info:', data);
      break;
    case 'bankingInfo':
      console.log('Saving banking info:', data);
      break;
    case 'changePassword':
      // Vérifier que les mots de passe correspondent
      if (data.newPassword !== data.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return; // Ne pas fermer le modal, permettre à l'utilisateur de corriger
      }
      
      // Simuler une vérification côté serveur
      console.log('Changing password:', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      
      // Dans un cas réel, vous feriez une requête API
      alert('Mot de passe modifié avec succès!');
      break;
    case 'deleteProfile':
      // Vérifier que l'utilisateur a bien tapé "SUPPRIMER"
      if (data.confirmation !== 'SUPPRIMER') {
        alert('Veuillez taper "SUPPRIMER" pour confirmer la suppression du profil');
        return; // Ne pas fermer le modal
      }
      
      // Simuler une requête de suppression
      console.log('Deleting profile with password verification:', data.password);
      
      // Dans un cas réel, vous feriez une requête API de suppression
      // et redirigeriez l'utilisateur vers la page d'accueil ou de connexion
      alert('Profil supprimé avec succès');
      // Redirection vers la page d'accueil (à implémenter)
      // router.push('/');
      break;
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
    <Modal
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