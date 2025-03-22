<script setup>
import { defineProps, defineEmits } from 'vue';
import deleteIcon from '@/assets/img/icons/delete_icon.svg';

const props = defineProps({
  name: String,
  headers: Array,
  items: Array
});

const emit = defineEmits(['toggleReccurence', 'openModal', 'openForm']);
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="uppercase font-semibold">{{ name }}</h2>
    <table class="w-full bg-light-gray rounded-lg relative">
      <thead class="bg-gray relative text-white font-medium">
        <tr>
          <th v-for="header in headers" :key="header.label">
            <img v-if="header.icon" class="block sm:hidden" :src="header.icon" :alt="header.label" />
            <span class="hidden sm:inline-block">{{ header.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="header in headers" :key="header.label">
            <template v-if="header.key === 'recurrent'">
              <label class="switch">
                <input type="checkbox" :checked="item.recurrent" @change="emit('toggleReccurence', item)" />
                <span class="slider round"></span>
              </label>
            </template>
            <template v-else-if="header.key === 'actions'">
              <button @click="emit('openModal', item)"><img :src="deleteIcon" alt="supprimer"></button>
            </template>
            <template v-else>
              {{ item[header.key] }}
            </template>
          </td>
        </tr>
        <tr class="tr-btn">
          <td :colspan="headers.length" class="w-full">
            <button class="cursor-pointer font-medium transition-all duration-200 hover:bg-accent1 hover:text-white" @click="emit('openForm')">
              + Ajouter {{ name === 'Revenus' ? 'un revenu' : 'une dépense' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>

thead tr,
tbody tr {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  align-items: center;
  justify-content: center;
}

tbody, thead {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

thead {
  border-radius: 8px 8px 0 0;
}

th {
  text-align: left;
}

tbody tr {
  background-color: var(--color-white);
  border-radius: 8px;
}

tr {
  display: block;
  padding-left: 22px;
  padding-right: 22px;
}

.tr-btn {
  display: block;
  width: 100%;
  padding: 0;
}

tbody tr {
  padding-top: 15px;
  padding-bottom: 15px;
}

thead tr {
  padding-top: 5px;
  padding-bottom: 5px;
}

.tr-btn td {
  width: 100%;
}

.tr-btn button {
  width: 100%;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 15px;
  padding-bottom: 15px;
}

thead, 
tbody {
  padding: 10px;
}

td {
  width: fit-content;
}

th, td {
  margin: auto;
}

th:nth-child(1),
td:nth-child(1) {
  margin: 0;
}

th img {
  height: 24px;
}

.tr-btn {
  margin: auto;
  border: 2px solid var(--color-accent2);
  transition: all 200ms ease;
}

table:hover .tr-btn {
  border-color: var(--color-accent1);
}

tbody img {
  height: 24px;
}

td {
  display: flex;
  align-items: center;
}

table::after {
  content: '';
  position: absolute;
  height: 60px;
  width: 30px;
  background-color: var(--color-accent2);
  top: 0;
  right: 2%;
  transition: all 200ms ease;
}

table:hover::after {
  height: 75px;
  background-color: var(--color-accent1);
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-accent1);
}

input:checked + .slider:before {
  transform: translateX(23px);
}

@media screen and (max-width: 800px) {
  thead tr,
  tbody tr {
  grid-template-columns: 4fr 2fr 2fr 1fr;
}

tr {
  padding: 5px 10px;
}
}

</style>