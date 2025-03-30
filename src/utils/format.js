export function formatDate(dateString) {
  if (!dateString) return "Non spécifié";

  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatAddress(address) {
  if (!address) return "Non spécifiée";

  return `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.province} ${address.country}`;
}

export function getAddressByType(addresses, type) {
  return addresses?.find((addr) => addr.type === type);
}
