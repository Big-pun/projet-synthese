<script setup>
import { computed } from 'vue';
import balanceIconPositive from '@/assets/img/icons/balance_icon_positive.svg';
import balanceIconNegative from '@/assets/img/icons/balance_icon_negative.svg';
import pieIcon from '@/assets/img/icons/pie_icon.svg';
import calendarIcon from '@/assets/img/icons/calendar_icon.svg';
import logo from '@/assets/img/logo.svg';

const props = defineProps({
  incomesTotal: Number,
  spendingsTotal: Number,
});

// Balance calculations
const balance = computed(() => {
  return Math.floor( props.incomesTotal - props.spendingsTotal);
});

const percentageSpent = computed(() => {
  // Avoid division by zero
  if (props.incomesTotal === 0) {
    return 100;
  }
  else {
    return Math.floor((props.spendingsTotal / props.incomesTotal) * 100);
  }
    
});

// Theme settings
// red theme if balance is negative, green theme if balance is positive
const themeClasses = computed(() => {
  return ({
    borderColor: balance.value > 0 ? 'border-accent1' : 'border-accent2',
    textColor: balance.value > 0 ? 'text-accent1' : 'text-accent2',
    backgroundColor: balance.value > 0 ? 'bg-accent1' : 'bg-accent2',
  })
});
</script>

<template>
  <div class="font-roboto">
    <!-- Section Title and Logo -->
    <div class="flex items-center mb-6">
      <img :src="logo" alt="Logo" class="w-6 h-6 mr-2"/>  
      <h1 class="uppercase text-gray font-bold">Budget Mensuel</h1>
    </div>
 
    <!-- Preview Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 space-y-6 lg:space-y-0">
      <!-- Balance Card -->
      <div :class="themeClasses.borderColor" class="self-center bg-light-gray text-lg shadow-sm rounded-3xl border-b-8 flex flex-col items-center max-w-[500px] mx-auto w-full">
        <h2 :class="themeClasses.backgroundColor" class="text-center font-medium w-full rounded-3xl rounded-b-none p-2 text-white text-lg">Balance du mois</h2>
        <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-max justify-center lg:justify-start p-6 md:p-mt-4">
          <img :src="balance > 0 ? balanceIconPositive : balanceIconNegative" class="shrink-0 w-20 md:w-28" alt="Balance du budget">
          <p :class="themeClasses.textColor"  class="font-normal text-[2.5rem] md:text-[3.5rem]">{{ `${balance > 0 ? '+' : ''}` }}{{ balance }}$</p>
        </div>
      </div>

      <!-- Balance Infos Tags -->
      <div class="flex text-lg flex-col justify-center items-center lg:items-end space-y-4 md:space-y-6">
        <button
          class="w-full max-w-xs md:max-w-sm flex items-center bg-gray text-white py-3 px-6 rounded-md">
          <img :src="calendarIcon" alt="Icon de calendrier" class="h-9 w-8" />
          <span class="grow">{{ spendingsTotal }}$ de dépensés</span>
        </button>

        <button
          class="w-full max-w-xs md:max-w-sm flex items-center bg-gray text-white py-3 px-6 rounded-md">
          <img :src="pieIcon" alt="Icon de diagramme circulaire" class="h-9 w-10" />
          <span class="grow">{{ percentageSpent }}% du budget dépensé</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>