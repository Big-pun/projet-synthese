<script setup>
import BudgetForm from '@/components/budget/BudgetForm.vue';
import BudgetPreview from '@/components/budget/BudgetPreview.vue';
import IncomeForm from '@/components/budget/IncomeForm.vue';
import IncomeTable from '@/components/budget/IncomeTable.vue';
import SpendingForm from '@/components/budget/SpendingForm.vue';
import SpendingTable from '@/components/budget/SpendingTable.vue';
import Modal from '@/components/general/Modal.vue';
import { useTransactionStore } from '@/services/transactionStore';
import { computed, onMounted, reactive, ref } from 'vue';

const transactionStore = useTransactionStore();

// Charger les transactions au montage du composant
onMounted(() => {
  const userId = 1; // Remplacez par l'ID utilisateur approprié
  transactionStore.fetchTransactions(userId);
});

const incomeFormModalOpen = ref(false);
const spendingFormModalOpen = ref(false);

/* this code (userBudget object with hardcoded values) will be deleted once the api will be linked, but the structure of the transactions objects will need to be this way */
/* use a computed value to perform any needed transformations from the transactions object from the API to the object below */
const incomes = ref([
    { id: 1, name: 'Salaire mensuel', amount: 3000, recurrent: true },
    { id: 2, name: 'Bourse universitaire', amount: 700, recurrent: true },
    { id: 3, name: 'Revenu freelance', amount: 500, recurrent: false }
  ]);

const spendings = ref([
    { id: 1, name: 'Loyer', category: 'Logement', amount: 900 },
    { id: 2, name: 'Courses alimentaires', category: 'Alimentation', amount: 300, recurrent: true },
    { id: 3, name: 'Abonnement Internet', category: 'Services', amount: 50, recurrent: true },
    { id: 4, name: 'Transport en commun', category: 'Transport', amount: 80, recurrent: false },
    { id: 5, name: 'Sorties et loisirs', category: 'Divertissement', amount: 150, recurrent: true }
  ]);

const calcItemsTotal = (items) => {
  return items.reduce((acc, item) => acc + item.amount, 0);
};

const incomesTotal = computed(() => {
  return calcItemsTotal(incomes.value);
});

const spendingsTotal = computed(() => {
  return calcItemsTotal(spendings.value);
});

const balance = computed(() => {
  return incomesTotal.value - spendingsTotal.value;
});

const percentageSpent = computed(() => {
  return Math.floor((spendingsTotal.value / incomesTotal.value) * 100);
});



const toggleIncomeReccurence = (itemId) => {
  incomes.value = incomes.value.map((item) => {
    if (item.id === itemId) {
      return { ...item, recurrent: !item.recurrent };
    } else {
      return item;
    }
  });
  console.log(incomes.value);
};

const toggleSpendingReccurence = (itemId) => {
  spendings.value = spendings.value.map((item) => {
    if (item.id === itemId) {
      return { ...item, recurrent: !item.recurrent };
    } else {
      return item;
    }
  });
  console.log(spendings.value);
};





const deleteSpending = (itemId) => {
  spendings.value = spendings.value.filter((item) => item.id !== itemId);
  console.log('Delete spending', itemId);
};

const deleteIncome = (itemId) => {
  incomes.value = incomes.value.filter((item) => item.id !== itemId);
  console.log('Delete income', itemId);
};

const addIncome = (income) => {
  incomes.value.push({...income, id: incomes.value.length + 1});
  incomeFormModalOpen.value = false;
};

const addSpending = (spending) => {
  console.log(spending)
  spendings.value.push({...spending, id: spendings.value.length + 1});
  spendingFormModalOpen.value = false;
};

const handleAddEntry = (newEntry) => {
  if (incomeFormModalOpen.value) {
    addIncome(newEntry);
  } else {
    addSpending(newEntry);
  }
}

const openIncomeFormModal = () => {
  incomeFormModalOpen.value = true;
  spendingFormModalOpen.value = false;
  console.log('openIncomeFormModal');
};

const openSpendingFormModal = () => {
  spendingFormModalOpen.value = true;
  incomeFormModalOpen.value = false;
  console.log('openSpendingFormModal');
};

const closeModal = () => {
  incomeFormModalOpen.value = false;
  spendingFormModalOpen.value = false;
};

</script>

<template>
  <div class="flex flex-col gap-12">

    <BudgetPreview :balance="balance" :percentageSpent="percentageSpent" :spendingsTotal="spendingsTotal"></BudgetPreview>

    <button class="border-2 border-accent1 hover:bg-accent1 inline-block w-max py-2 px-5 rounded-md self-end text-accent1 hover:text-white font-semibold transition-all">Nouveau mois</button>
    
    <IncomeTable
    :incomes="incomes"
    :itemsTotal="incomesTotal"
    @toggleReccurence="toggleIncomeReccurence"
    @deleteItem="deleteIncome"
    @openForm="openIncomeFormModal" 
    />
    
    <SpendingTable
    :spendings="spendings"
    :itemsTotal="spendingsTotal"
    @openForm="openSpendingFormModal"
    @deleteItem="deleteSpending"
    @toggleReccurence="toggleSpendingReccurence"
    />

    <Modal :isOpen="incomeFormModalOpen || spendingFormModalOpen" @close="closeModal">
      <BudgetForm 
      :title="incomeFormModalOpen ? 'Ajouter un revenu' : 'Ajouter une dépense'"
      :subTitle="incomeFormModalOpen ? 'Ajoutez un revenu récurrent ou ponctuel' : 'Ajoutez une dépense récurrente ou ponctuelle'"
      :hasCategory="spendingFormModalOpen"
      @submit="handleAddEntry"
      >
      </BudgetForm>
    </Modal>

  </div>
</template>

<style></style>