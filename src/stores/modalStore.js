import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref(false);
  const modalType = ref('');
  const modalTitle = ref('');
  const formFields = ref([]);
  const formData = reactive({});
  
  function openModal(type, title, fields, data) {
    modalType.value = type;
    modalTitle.value = title;
    formFields.value = fields;
    formData.value = { ...data };
    isModalOpen.value = true;
  }
  
  function closeModal() {
    isModalOpen.value = false;
  }
  
  return {
    isModalOpen,
    modalType,
    modalTitle,
    formFields,
    formData,
    openModal,
    closeModal
  };
});
