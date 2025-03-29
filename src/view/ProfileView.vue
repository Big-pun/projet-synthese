<script setup>
import { ref, shallowRef, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '@/components/general/Modal.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import ProfilePersonnalInfos from '@/components/profile/ProfilePersonnalInfos.vue';
import ProfileSchoolInfos from '@/components/profile/ProfileSchoolInfos.vue';
import ProfileBankingInfos from '@/components/profile/ProfileBankingInfos.vue';

// Import forms
import ChangePasswordForm from '@/components/profile/forms/ChangePasswordForm.vue';
import DeleteProfileForm from '@/components/profile/forms/DeleteProfileForm.vue';
import PersonalInfoForm from '@/components/profile/forms/PersonalInfoForm.vue';
import SchoolInfoForm from '@/components/profile/forms/SchoolInfoForm.vue';
import BankingInfoForm from '@/components/profile/forms/BankingInfoForm.vue';

import { showLoading, closeLoading, showConfirm } from '@/utils/sweetAlert';
import { showSuccess, showError } from '@/utils/toast';

// Import stores
import { useUserStore } from '@/services/userStore';
import { useBankingStore } from '@/services/bankingStore';
import { useSchoolStore } from '@/services/schoolStore';
import { useAddressStore } from '@/services/addressStore';

// Local state for modal and forms
const isModalOpen = ref(false);
const activeForm = shallowRef(null);
const formTitle = ref('');
const formData = ref(null);
const userAddresses = ref([]);
const bankingDetails = ref(null);
const schoolDetails = ref(null);
const isLoading = ref(false);

const userStore = useUserStore();
const bankingStore = useBankingStore();
const schoolStore = useSchoolStore();
const addressStore = useAddressStore();
const router = useRouter();

// Authentication check
function checkAuthentication() {
  if (!userStore.user) {
    showError('Veuillez vous connecter pour accéder à votre profil');
    router.push('/accueil');
  }
}

// Function to open the form
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
        break;
        
      case 'schoolInfo':
        activeForm.value = SchoolInfoForm;
        formTitle.value = 'Modifier votre établissement scolaire';
        formData.value = schoolDetails.value;
        break;
        
      case 'bankingInfo':
        activeForm.value = BankingInfoForm;
        formTitle.value = 'Modifier vos renseignements bancaires';
        formData.value = bankingDetails.value;
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

// Function to close the modal
function handleClose() {
  isModalOpen.value = false;
  activeForm.value = null;
  formTitle.value = '';
}

// Add this function to load all necessary data
async function loadAllUserData() {
  try {
    isLoading.value = true;
    // Check if the user is connected first
    if (!userStore.user?.id) {
      checkAuthentication();
      return;
    }
    
    const userId = userStore.user.id;
    
    // Charger toutes les données en parallèle
    await Promise.all([
      addressStore.fetchAddresses(userId),
      bankingStore.fetchBankingDetails(userId),
      schoolStore.fetchSchoolDetails(userId)
    ]);
    
    // Mettre à jour TOUTES les références locales
    userAddresses.value = addressStore.addresses;
    bankingDetails.value = bankingStore.bankingDetails;
    schoolDetails.value = schoolStore.schoolDetails;
    
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    showError('Impossible de charger certaines données utilisateur');
  } finally {
    isLoading.value = false;
  }
}

// Appeler au montage du composant
onMounted(async () => {
  // Vérifier si l'utilisateur est connecté
  checkAuthentication();
  
  // Si oui, charger les données
  if (userStore.user) {
    await loadAllUserData();
  }
});

// Gérer la sauvegarde des données en fonction du type de modal
async function handleSave(data) {
  try {
    showLoading('Enregistrement en cours...');
    
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
    
    // Après une sauvegarde réussie, recharger les données
    await loadAllUserData();
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
  <div class="container mx-auto">
    <!-- Indicateur de chargement global optionnel -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded-lg shadow-lg">
        Chargement en cours...
      </div>
    </div>
    
    <ProfilePreview 
      :userData="userStore.user"
      @change-password="openForm('changePassword')" 
      @delete-profile="openForm('deleteProfile')"
    />
    
    <ProfilePersonnalInfos 
      :userData="userStore.user"
      :userAddresses="userAddresses"
      @edit="openForm('personnalInfo')"
    />
    
    <!-- Section avec informations scolaires et bancaires côte à côte -->
    <div class="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 max-w-screen-lg mx-auto">
      <ProfileSchoolInfos
        :schoolDetails="schoolDetails"
        @edit="openForm('schoolInfo')"
      />
      <ProfileBankingInfos 
        :bankingDetails="bankingDetails"
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
        :bankingDetails="bankingDetails"
        :schoolDetails="schoolDetails"
        :title="formTitle"
        @save="handleSave"
        @cancel="handleClose"
        class="w-full"
      />
    </Modal>
  </div>
</template>

<style>
</style>