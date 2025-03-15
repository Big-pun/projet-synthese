import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { getFormFields, getFormTitle } from '@/utils/formValidation';

export const useProfileFormStore = defineStore('profileForm', () => {
  const formType = ref('');
  const formTitle = ref('');
  const formFields = ref([]);
  const formData = reactive({});

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
  }

  return {
    formType,
    formTitle,
    formFields,
    formData,
    chooseForm,
    setupForm,
    resetForm
  };
}); 