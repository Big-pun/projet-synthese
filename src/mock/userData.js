/**
 * Données utilisateur fictives pour simuler les réponses de l'API
 * Format conforme au schéma d'API
 */

export const mockUser = {
  id: 1,
  firstName: "Bruno",
  lastName: "Gautier",
  birthDate: "1992-01-02T00:00:00.000Z",
  isActive: true,
  phone: "581-422-5029",
  email: "brunogautier@gmail.com",
  password: "********", // Simulé pour les besoins du mock
  addresses: [
    {
      id: 1,
      streetNumber: "885",
      streetName: "rue de l'escarpement",
      city: "Trois-Rivieres",
      province: "QC",
      country: "CA",
      type: "PERSONAL",
      user: "1"
    },
    {
      id: 2,
      streetNumber: "22",
      streetName: "rue du Fort",
      city: "Trois-Rivieres",
      province: "QC",
      country: "CA",
      type: "WORK",
      user: "1"
    }
  ],
  transactions: [
    {
      id: 1,
      description: "Salaire mensuel",
      category: "Revenus",
      amount: 2500,
      type: "Revenue",
      isDone: true,
      startDate: "2023-03-01T00:00:00.000Z",
      endDate: null,
      frequency: 30,
      user: "1"
    },
    {
      id: 2,
      description: "Loyer",
      category: "Logement",
      amount: 850,
      type: "Expense",
      isDone: true,
      startDate: "2023-03-01T00:00:00.000Z",
      endDate: null,
      frequency: 30,
      user: "1"
    },
    {
      id: 3,
      description: "Épicerie",
      category: "Alimentation",
      amount: 125,
      type: "Expense",
      isDone: false,
      startDate: "2023-03-05T00:00:00.000Z",
      endDate: null,
      frequency: 7,
      user: "1"
    }
  ],
  schoolDetails: {
    id: 1,
    schoolName: "Cegep de Trois-Rivieres",
    fieldOfStudy: "Développement Web",
    startDate: "2023-10-10T00:00:00.000Z",
    projectedEndDate: "2025-06-06T00:00:00.000Z",
    user: "1"
  },
  bankingDetails: {
    id: 1,
    institutionName: "Desjardins",
    accountInfo: "815-999-5666",
    loanInfo: "Aucun",
    other: "-",
    user: "1"
  }
};

/**
 * Fonction utilitaire pour formatter une date au format français
 */
export function formatDate(dateString) {
  if (!dateString) return 'Non spécifié';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Fonction utilitaire pour formatter une adresse
 */
export function formatAddress(address) {
  if (!address) return 'Non spécifiée';
  
  return `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.province} ${address.country}`;
}

/**
 * Fonction pour obtenir une adresse par type
 */
export function getAddressByType(addresses, type) {
  return addresses?.find(addr => addr.type === type);
}

/**
 * Fonction pour formatter un montant en euros
 */
export function formatAmount(amount) {
  if (amount === undefined || amount === null) return 'Non spécifié';
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}