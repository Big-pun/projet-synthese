import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { getFormFields, getFormTitle } from '@/utils/formValidation';

export const useProfileFormStore = defineStore('profileForm', () => {
  const formType = ref('');
  const formTitle = ref('');
  const formFields = ref([]);
  const formData = reactive({});
  const userAddresses = ref([]);

  function chooseForm(type, title, fields, data) {
    formType.value = type;
    formTitle.value = title || getFormTitle(type);
    formFields.value = fields || getFormFields(type);
    formData.value = { ...data };
  }

  function setupForm(type, data) {
    chooseForm(type, getFormTitle(type), getFormFields(type), data);
  }

  function resetForm() {
    formType.value = '';
    formTitle.value = '';
    formFields.value = [];
    Object.keys(formData).forEach(key => delete formData[key]);
    userAddresses.value = [];
  }

  function setupAddressForm(addressType, addresses) {
    let title = '';
    switch (addressType) {
      case 'PERSONAL':
        title = 'Éditer l\'adresse personnelle';
        break;
      case 'WORK':
        title = 'Éditer l\'adresse professionnelle';
        break;
      default:
        title = 'Éditer l\'adresse';
    }
    
    userAddresses.value = [...addresses];
    
    const existingAddress = addresses?.find(addr => addr.type === addressType);
    
    if (existingAddress) {
      chooseForm('addressInfo', title, getFormFields('addressInfo'), {
        id: existingAddress.id,
        type: addressType,
        streetNumber: existingAddress.streetNumber,
        streetName: existingAddress.streetName,
        city: existingAddress.city,
        province: existingAddress.province,
        country: existingAddress.country
      });
    } else {
      chooseForm('addressInfo', title, getFormFields('addressInfo'), {
        type: addressType,
        country: 'CA'
      });
    }
  }

  function setupPersonalInfoForm(userData, addresses) {
    userAddresses.value = [...addresses];
    chooseForm('personnalInfo', 'Éditer mes informations personnelles', null, userData);
  }

  return {
    formType,
    formTitle,
    formFields,
    formData,
    userAddresses,
    chooseForm,
    setupForm,
    setupAddressForm,
    setupPersonalInfoForm,
    resetForm
  };
}); 