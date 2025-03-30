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

import { closeLoading, showLoadingPopup } from '@/utils/sweetAlert';
import { showSuccess, showError } from '@/utils/toast';

// Import stores
import { useUserStore } from '@/services/userStore';
import { useBankingStore } from '@/services/bankingStore';
import { useSchoolStore } from '@/services/schoolStore';
import { useAddressStore } from '@/services/addressStore';

// Local state for modal and forms
const isModalOpen = ref(false);
const activeForm = shallowRef(null);
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

        break;
        
      case 'deleteProfile':
        activeForm.value = DeleteProfileForm;
        break;
        
      case 'personnalInfo':
        activeForm.value = PersonalInfoForm;
        formData.value = userStore.user;
        break;
        
      case 'schoolInfo':
        activeForm.value = SchoolInfoForm;
        formData.value = schoolDetails.value;
        break;
        
      case 'bankingInfo':
        activeForm.value = BankingInfoForm;
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
    
    // load all the data in parallel
    await Promise.all([
      addressStore.fetchAddresses(userId),
      bankingStore.fetchBankingDetails(userId),
      schoolStore.fetchSchoolDetails(userId)
    ]);
    
    // update all the local references
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

// call when the component is mounted
onMounted(async () => {
  // check if the user is connected
  checkAuthentication();
  
  // if yes, load the data
  if (userStore.user) {
    await loadAllUserData();
  }
});

// handle the save of the data depending on the type of modal
async function handleSave(data) {
  try {
    showLoadingPopup('Enregistrement en cours...');
    
    // simulate a server processing delay (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // close the loading indicator
    closeLoading();
    
    // specific processing depending on the type of form
    let successMessage = '';
    
    if (activeForm.value === PersonalInfoForm) {
      successMessage = 'Vos informations personnelles ont été mises à jour avec succès.';
    }
    else if (activeForm.value === SchoolInfoForm) {
      successMessage = 'Vos informations scolaires ont été mises à jour avec succès.';
    }
    else if (activeForm.value === BankingInfoForm) {
      successMessage = 'Vos informations bancaires ont été mises à jour avec succès.';
    }
    else if (activeForm.value === ChangePasswordForm) {
      successMessage = 'Votre mot de passe a été modifié avec succès!';
    }
    else if (activeForm.value === DeleteProfileForm) {
      successMessage = 'Votre profil a été supprimé avec succès';
    }
    else {
      successMessage = 'Vos modifications ont été enregistrées avec succès.';
    }
    
    // display the standardized success toast
    showSuccess(successMessage);
    
    // close the modal after processing
    isModalOpen.value = false;
    
    // after a successful save, reload the data
    await loadAllUserData();
  } catch (error) {
    // close the loading indicator in case of error
    closeLoading();
    
    // handle the errors
    showError('Une erreur est survenue lors de la sauvegarde des données.');
    console.error('Error saving data:', error);
  }
}
</script>

<template>
  <div class="container mx-auto">
    <!-- global loading indicator (optional) -->
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
    
    <!-- section with school and banking information side by side -->
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
    
    <!-- modal for the forms -->
    <Modal
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      @close="handleClose"
    >
      <component 
        :is="activeForm"
        v-if="activeForm"
        :userData="formData"
        :userAddresses="userAddresses"
        :bankingDetails="bankingDetails"
        :schoolDetails="schoolDetails"
        @save="handleSave"
        @cancel="handleClose"
        class="w-full"
      />
    </Modal>
  </div>
</template>

<style>
</style>