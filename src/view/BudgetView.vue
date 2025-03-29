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

// a remettre apres tests
// const userId = computed(() => userStore.user?.id || null);

// a enlever apres tests
const userId = ref(18);

// Fetch transactions on component mount
onMounted(() => {
  transactionStore.fetchTransactions(userId.value);
  console.log('BudgetView mounted');
});

const defaultFrequency = 30;

// State Management
const incomeFormModalOpen = ref(false);
const spendingFormModalOpen = ref(false);

// this code (incomes and spendings arrays) will be deleted once the api will be linked. We'll get these arrays from the transactionsStore
// but the structure of the transactions objects will need to be this way
// use a computed value to perform any needed transformations from the transactions object from the API to the object below
/* const incomes = ref([
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
*/
const transactionsFormatted = computed(() => {
  return transactionStore.transactions 
    ? transactionStore.transactions.map(transaction => ({... transaction, amount: parseFloat(transaction.amount)}))
    : [];
})

const incomes = computed(() => transactionsFormatted.value.filter((transaction) => transaction.type === 'Revenue'));

const spendings = computed(() => transactionsFormatted.value.filter((transaction) => transaction.type === 'Expense'));

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

// Recurrence Toggle Switch Function (set a default frequency value)
const toggleTransactionReccurence = (transactionId) => {
  const transaction = transactionsFormatted.value.find((transaction) => transaction.id === transactionId);
  transactionStore.updateTransaction(userId.value, transactionId, {
    ...transaction, frequency: transaction.frequency === -1 ? defaultFrequency : -1
  })
}

const updateTransactionFrequency = (payload) => {
  const { transactionId= payload.itemId, frequency } = payload;
  console.log('transactionId', transactionId);
  console.log('frequency', frequency);
  const transaction = transactionsFormatted.value.find((transaction) => transaction.id === transactionId);
  transactionStore.updateTransaction(userId.value, transactionId, {
    ...transaction, frequency: frequency
  })
}

const deleteTransaction = (transactionId) => {
  transactionStore.deleteTransaction(userId.value, transactionId);
};

const addIncome = (transaction) => {
  const newTransaction = {
    ...transaction,
    amount: parseFloat(transaction.amount),
    type: 'Revenue',
    isDone: true,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  };
  console.log(newTransaction);
  transactionStore.addNewTransaction(userId.value, newTransaction);
};

const addSpending = (transaction) => {
  transactionStore.addNewTransaction(userId.value, {
      ...transaction,
       type: 'Expense',
       isDone: true,
       startDate: new Date().toISOString(),
       endDate: new Date().toISOString(),
    });
};

const handleAddEntry = (newEntry) => {
  if (incomeFormModalOpen.value) {
    addIncome(newEntry);
  } else {
    addSpending(newEntry);
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
    transactionStore.deleteNonRecurrentTransactions(userId.value);
    Swal.fire({
      title: "Supprime!",
      text: `Les transactions non reccurentes ont bien ete supprimees. Vous etes pret pour votre nouveau mois !`,
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
    :loading ="transactionStore.loading"
    :incomes="incomes"
    :itemsTotal="incomesTotal"
    @toggleTransactionReccurence="toggleTransactionReccurence"
    @deleteItem="deleteTransaction"
    @openForm="openIncomeFormModal" 
    @updateFrequency="updateTransactionFrequency"
    />
    
    <SpendingTable
    :loading ="transactionStore.loading"
    :spendings="spendings"
    :itemsTotal="spendingsTotal"
    @openForm="openSpendingFormModal"
    @deleteItem="deleteTransaction"
    @toggleTransactionReccurence="toggleTransactionReccurence"
    @updateFrequency="updateTransactionFrequency"
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