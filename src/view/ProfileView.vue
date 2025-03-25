<script setup>
import { ref, shallowRef, onMounted, nextTick } from 'vue';
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

import { computed } from 'vue';
import { useUserStore } from '@/services/userStore';
import { useBankingStore } from '@/services/bankingStore';
import { useSchoolStore } from '@/services/schoolStore';
import { useAddressStore } from '@/services/addressStore';

// État local pour le modal et les formulaires
const isModalOpen = ref(false);
const activeForm = shallowRef(null);
const formTitle = ref('');
const formData = ref(null);
const userAddresses = ref(null);

const userStore = useUserStore();
const bankingStore = useBankingStore();
const schoolStore = useSchoolStore();
const addressStore = useAddressStore();

const userData = computed(() => userStore.user);
const bankingDetails = computed(() => bankingStore.bankingDetails);
const schoolDetails = computed(() => schoolStore.schoolDetails);
// const userAddresses = computed(() => addressStore.addresses);

// Fonction de chargement des données
async function loadProfileData() {
  if (!userStore.user?.id) {
    console.log("Pas d'ID utilisateur disponible");
    return;
  }
  
  console.log("Loading profile data for user:", userStore.user.id);
  showLoading('Chargement de vos informations...');
  
  try {
    // Charger les données une par une pour mieux identifier les erreurs
    try {
      await bankingStore.fetchBankingDetails(userStore.user.id);
      console.log("Banking details loaded");
    } catch (e) {
      console.error("Error loading banking details:", e);
    }

    try {
      await schoolStore.fetchSchoolDetails(userStore.user.id);
      console.log("School details loaded");
    } catch (e) {
      console.error("Error loading school details:", e);
    }

    try {
      await addressStore.fetchAddresses(userStore.user.id);
      console.log("Addresses loaded");
    } catch (e) {
      console.error("Error loading addresses:", e);
    }
  } catch (error) {
    showError('Erreur lors du chargement des données');
    console.error("Global error:", error);
  } finally {
    closeLoading();
  }
}

// Fonction pour ouvrir le formulaire
async function openForm(formType) {
  try {
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
        formData.value = userStore.user;
        userAddresses.value = addressStore.addresses;
        break;
        
      case 'schoolInfo':
        activeForm.value = SchoolInfoForm;
        formTitle.value = 'Modifier votre établissement scolaire';
        formData.value = schoolStore.schoolDetails;
        break;
        
      case 'bankingInfo':
        activeForm.value = BankingInfoForm;
        formTitle.value = 'Modifier vos renseignements bancaires';
        formData.value = bankingStore.bankingDetails;
        break;
        
      default:
        console.error('Type de formulaire non reconnu:', formType);
        return;
    }
    
    await nextTick();
    isModalOpen.value = true;
  } catch (error) {
    console.error('Erreur lors de l\'ouverture du formulaire:', error);
  }
}

// Fonction pour fermer le modal
function handleClose() {
  isModalOpen.value = false;
  activeForm.value = null;
  formTitle.value = '';
}

// Chargement initial des données
onMounted(async () => {
  if (userStore.user?.id) {
    await loadProfileData();
  }
});

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
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <ProfilePreview 
      @change-password="openForm('changePassword')" 
      @delete-profile="openForm('deleteProfile')"
    />
    
    <ProfilePersonnalInfos 
      @edit="openForm('personnalInfo')"
    />
    
    <!-- Section avec informations scolaires et bancaires côte à côte -->
    <div class="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 max-w-screen-lg mx-auto">
      <ProfileSchoolInfos 
        @edit="openForm('schoolInfo')"
      />
      <ProfileBankingInfos 
        @edit="openForm('bankingInfo')"
      />
    </div>
    
    <!-- Modal pour les formulaires -->
    <Modal
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      :title="formTitle"
      @close="handleClose"
    >
      <component 
        :is="activeForm"
        v-if="activeForm"
        :userData="formData"
        :userAddresses="userAddresses"
        @save="handleSave"
        @cancel="handleClose"
        class="w-full"
      />
    </Modal>
  </div>
</template>

<style>
</style>