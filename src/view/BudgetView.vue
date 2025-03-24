<script setup>
import BudgetForm from '@/components/budget/BudgetForm.vue';
import BudgetPreview from '@/components/budget/BudgetPreview.vue';
import IncomeTable from '@/components/budget/IncomeTable.vue';
import SpendingTable from '@/components/budget/SpendingTable.vue';
import Modal from '@/components/general/Modal.vue';
import { useTransactionStore } from '@/services/transactionStore';
import { computed, onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import { useUserStore } from '@/services/userStore';

const transactionStore = useTransactionStore();
const userStore = useUserStore();

const userId = computed(() => userStore.user?.id || null);

// Fetch transactions on component mount
onMounted(() => {
  transactionStore.fetchTransactions(userId.value);
});

const defaultFrequency = 30;

// State Management
const incomeFormModalOpen = ref(false);
const spendingFormModalOpen = ref(false);

// this code (incomes and spendings arrays) will be deleted once the api will be linked. We'll get these arrays from the transactionsStore
// but the structure of the transactions objects will need to be this way
// use a computed value to perform any needed transformations from the transactions object from the API to the object below
const incomes = ref([
    { id: 1, name: 'Salaire', amount: 3000, frequency: 7 },
    { id: 2, name: 'Bourse universitaire', amount: 700, frequency: 30 },
    { id: 3, name: 'Revenu freelance', amount: 500, frequency: -1 }
  ]);

const spendings = ref([
    { id: 1, name: 'Loyer', category: 'Logement', amount: 900, frequency: 30 },
    { id: 2, name: 'Courses alimentaires', category: 'Alimentation', amount: 300, frequency: 14},
    { id: 3, name: 'Abonnement Internet', category: 'Services', amount: 50, frequency: 30 },
    { id: 4, name: 'Transport en commun', category: 'Transport', amount: 80, frequency: -1 },
    { id: 5, name: 'Sorties et loisirs', category: 'Divertissement', amount: 150, frequency: -1 }
  ]);

// const incomes = computed(() => transactionStore.transactions.value.filter((transaction) => transaction.type === 'Revenue'));
// const spendings = computed(() => transactionStore.transactions.value.filter((transaction) => transaction.type === 'Spending'));

const isEntryRecurrent = (entry) => entry.frequency !== -1;

// Totals Calculations
const calcItemsTotal = (items) => {
  const itemsTotalsWithFrequency = items.map((item) => {
    if(item.frequency === 1) {
      return ({...item, amount: item.amount * 30});
    } else if(item.frequency === 7) {
      return ({...item, amount: item.amount * 4});
    } else if(item.frequency === 14) {
      return ({...item, amount: item.amount * 2});
    } else {
      return item;
    }
  });
  return itemsTotalsWithFrequency.reduce((acc, item) => acc + item.amount, 0);
};

const incomesTotal = computed(() => {
  return calcItemsTotal(incomes.value);
});

const spendingsTotal = computed(() => {
  return calcItemsTotal(spendings.value);
});


// Recurrence Toggles Functions
const toggleIncomeReccurence = (itemId) => {
  incomes.value = incomes.value.map((item) => {
    if (item.id === itemId) {
      if(item.frequency === -1) {
        return { ...item, frequency: defaultFrequency };
      } else {
        return { ...item, frequency: -1 };
      }
    } else {
      return item;
    }
  });
};

const toggleSpendingReccurence = (itemId) => {
  spendings.value = spendings.value.map((item) => {
    if (item.id === itemId) {
      if(item.frequency === -1) {
        return { ...item, frequency: defaultFrequency };
      } else {
        return { ...item, frequency: -1 };
      }
    } else {
      return item;
    }
  });
};

// Add / Deletion Functions
// this function will be deleted once the api will be linked. Deletion step will be handled by the transactionsStore
const deleteSpending = (itemId) => {
  spendings.value = spendings.value.filter((item) => item.id !== itemId);
};

// this function will be deleted once the api will be linked. Deletion step will be handled by the transactionsStore
const deleteIncome = (itemId) => {
  incomes.value = incomes.value.filter((item) => item.id !== itemId);
};

// this function will be deleted once the api will be linked. Addition step will be handled by the transactionsStore
const addIncome = (income) => {
  incomes.value.push({...income, id: incomes.value.length + 1});
  incomeFormModalOpen.value = false;
};

// this function will be deleted once the api will be linked. Addition step will be handled by the transactionsStore
const addSpending = (spending) => {
  spendings.value.push({...spending, id: spendings.value.length + 1});
  spendingFormModalOpen.value = false;
};

const handleAddEntry = (newEntry) => {
  if (incomeFormModalOpen.value) {
    addIncome(newEntry); // will need to be replaced with the actual call to the transactionsStore addIncome method
  } else {
    addSpending(newEntry); // will need to be replaced with the actual call to the transactionsStore addSpending method
  }
}

// Modal Management
const openIncomeFormModal = () => {
  incomeFormModalOpen.value = true;
  spendingFormModalOpen.value = false;
};

const openSpendingFormModal = () => {
  spendingFormModalOpen.value = true;
  incomeFormModalOpen.value = false;
};

const closeModal = () => {
  incomeFormModalOpen.value = false;
  spendingFormModalOpen.value = false;
};

// Reset Budget for New Month Function
const resetBudgetNewMonth = async () => {
  // SweetAlert2 confirmation modal
  const result = await Swal.fire({
    title: "Etes vous surs de vouloir commencer un nouveau mois?",
    text: `Cette action est irreversible!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#00EC86",
    cancelButtonColor: "#F74949",
    confirmButtonText: "Oui, supprimer!"
  });

  // If user confirms, delete all non-recurrent items
  if (result.isConfirmed) {
    incomes.value = incomes.value.filter((item) => isEntryRecurrent(item));
    spendings.value = spendings.value.filter((item) => isEntryRecurrent(item));
    Swal.fire({
      title: "Supprime!",
      text: `L'entree a bien ete supprimee.`,
      icon: "success"
    });
  }
}
</script>

<template>
  <div class="flex flex-col gap-8">

    <BudgetPreview :incomesTotal="incomesTotal" :spendingsTotal="spendingsTotal"></BudgetPreview>

    <button class="border-2 border-accent1 hover:bg-accent1 inline-block w-max py-2 px-5 rounded-md self-end text-accent1 hover:text-white font-semibold transition-all" @click="resetBudgetNewMonth" >Nouveau mois</button>
    
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
      />
    </Modal>

  </div>
</template>

<style></style>