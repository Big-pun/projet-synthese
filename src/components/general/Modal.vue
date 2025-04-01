<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(['close']);

// close modale
const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* à revoir */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  max-width: 75%;
  max-height: 80%;
  overflow-y: auto;
}

@media screen and (max-width: 767px) {
  .modal-content {
  max-width: 92%;
  max-height: 85%;
}
}


</style>
