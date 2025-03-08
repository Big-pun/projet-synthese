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
  }
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
      @update:is-open="modalStore.closeModal"
      @save="handleSave"
    />
  </template>

<style>
</style>