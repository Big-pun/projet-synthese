<script setup>
import { defineProps, defineEmits } from 'vue';
import deleteIcon from '@/assets/img/delete_icon.svg';
import Swal from 'sweetalert2';
import { showDeletePopup } from '@/utils/sweetAlert';

const props = defineProps({
  name: String,
  headers: Array,
  items: Array,
  primaryColorTheme: Boolean,
  itemsTotal: Number,
  loading: Boolean
});

const emit = defineEmits(['toggleTransactionReccurence', 'updateFrequency', 'openForm', 'deleteItem']);

const handleDeleteItem = async (itemId) => {
  // Sweet alert confirmation
  const result = await showDeletePopup({});

  // If user confirms, delete item (fires deleteItem event)
  if (result.isConfirmed) {
    emit('deleteItem', itemId);
    Swal.fire({
      title: "Supprimé!",
      text: `L'entrée a bien été supprimée.`,
      icon: "success"
    });
  }
};

const handleToggleTransactionReccurence = (itemId) => {
  emit('toggleTransactionReccurence', itemId);
};

const handleUpdateFrequency = (itemId, frequency) => {
  emit('updateFrequency', { itemId, frequency });
};

const isEntryRecurrent = (entry) => entry.frequency !== -1;

</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Table title -->
    <h2 class="uppercase font-semibold mb-1" :class="primaryColorTheme ? 'text-accent1' : 'text-accent2'">{{ name }}</h2>
    <!-- Table -->
    <table class="w-full bg-light-gray rounded-lg relative">
      <!-- Table header - loop through headers props to populate table header -->
      <!-- Headers text hidden on screens < md (table rows switch to cards) -->
      <thead class="bg-gray relative text-white font-medium">
        <tr>
          <th v-for="header in headers" :key="header.label" class="text-left">
            <img v-if="header.icon" class="block sm:hidden h-6" :src="header.icon" :alt="header.label" />
            <span class="hidden md:inline-block">{{ header.label }}</span>
          </th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <!-- Loading And 'No transaction yet' handling -->
      <tr class="tr-w-full bg-white rounded-[8px]" v-if="items.length === 0">
        <td class="text-gray-500 font-medium py-5">
          <p class="text-sm">{{ loading ? "Loading..." : "Aucune transaction pour le moment" }}</p>
        </td>
      </tr>
        <!-- Loop through items (each income or spending) and headers props to populate table body in the right order -->
        <tr v-for="item in items" :key="item.id" class="bg-white rounded-[8px]">
          <td v-for="header in headers" :key="header.label">

            <!-- Recurrence column -->
            <template v-if="header.key === 'recurrent'">
              <div class="flex flex-col items-center gap-2" :class="!isEntryRecurrent(item) ? 'my-5' : ''">
                <span class="block md:hidden font-semibold">Récurrent</span>
                <!-- Recurrence Toggle Switch -->
                <label class="switch">
                  <input
                    type="checkbox"
                    :checked="isEntryRecurrent(item)"
                    @change="handleToggleTransactionReccurence(item.id)"
                  />
                  <span class="slider round"></span>
                </label>

                <!-- Frequency Select (visible if reccurence toggle swicth is ON) -->
                <select
                  v-if="isEntryRecurrent(item)"
                  v-model="item.frequency"
                  @change="handleUpdateFrequency(item.id, item.frequency)"
                  class="border border-gray-300 rounded-md p-1"
                >
                  <option :value="1">Quotidien</option>
                  <option :value="7">Hebdomadaire</option>
                  <option :value="14">Bimensuel</option>
                  <option :value="30">Mensuel</option>
                  <option :value="-1">Non récurrent</option>
                </select>
              </div>
            </template>

            <!-- Actions column -->
            <template v-else-if="header.key === 'actions'">
              <button @click="handleDeleteItem(item.id)"><img :src="deleteIcon" class="h-6" alt="supprimer"></button>
            </template>

            <!-- Other fields columns -->
            <template v-else>
              {{ item[header.key] === '' ? '-' : item[header.key] }} {{ header.key === 'amount' ? '$' : '' }}
            </template>

          </td>
        </tr>

        <!-- Add new item btn -->
        <tr class="new-item-btn border-2 bg-white rounded-[8px] m-auto transition-all duration-[250ms]" :class="primaryColorTheme ? 'hover:bg-accent1 border-accent1 hover:border-accent1' : 'hover:bg-accent2 border-accent2 hover:border-accent2'">
          <td :colspan="headers.length" class="w-full">
            <button class="cursor-pointer font-medium transition-all duration-200 hover:text-white" @click="emit('openForm')" :class="primaryColorTheme ? 'hover:bg-accent1' : 'hover:bg-accent2'">
              + Ajouter {{ name === 'Revenus' ? 'un revenu' : 'une dépense' }}
            </button>
          </td>
        </tr>
      </tbody>

      <!-- Table tag -->
      <span class="tag" :class="primaryColorTheme ? 'bg-accent1' : 'bg-accent2'"></span>

    </table>

    <!-- Total -->
    <p :class="primaryColorTheme ? 'text-accent1' : 'text-accent2'" class="text-right">Total des {{ name }}: {{ itemsTotal }}$</p>
  </div>
</template>


<style scoped>

/* table shared styles */
thead tr,
tbody tr {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  align-items: center;
  justify-content: center;
}

tbody tr.tr-w-full {
  grid-template-columns: 1fr !important;
  justify-items: center;
}

tbody, thead {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

thead {
  border-radius: 8px 8px 0 0;
}

tr {
  padding-left: 22px;
  padding-right: 22px;
}

tbody tr:hover {
  background-color: rgb(247, 247, 247);
}

tbody tr {
  padding-top: 15px;
  padding-bottom: 15px;
}

thead tr {
  padding-top: 5px;
  padding-bottom: 5px;
}

td {
  width: fit-content;
  display: flex;
  align-items: center;
}

th, td {
  margin: auto;
}

th:nth-child(1),
td:nth-child(1) {
  margin: 0;
}

/* add item btn */
.new-item-btn {
  display: block;
  width: 100%;
  padding: 0;
}

.new-item-btn td {
  width: 100%;
}

.new-item-btn button {
  width: 100%;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 15px;
  padding-bottom: 15px;
}

/* table tag */
.tag {
  position: absolute;
  height: 60px;
  width: 30px;
  top: 0;
  right: 2%;
  transition: all 200ms ease;
  border-radius: 0 0 4px 4px;
}

table:hover .tag {
  height: 75px;
}

@media screen and (max-width: 800px) {
  tr {
    padding: 5px 10px;
  }
}

@media screen and (max-width: 768px) {
  tbody tr {
    display: flex;
    flex-direction: column;
  }
}

</style>