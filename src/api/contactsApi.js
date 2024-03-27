import contactsData from '../contacts.json';

export const fetchContacts = async () => {
  try {
    // Simula una llamada a la API con un retraso
    await new Promise(resolve => setTimeout(resolve, 1000));
    return contactsData;
  } catch (error) {
    throw new Error('Error fetching contacts data', error);
  }
};