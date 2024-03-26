import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import contacts from "../contacts.json";

export const useContactsStore = defineStore('contacts', () => {

    // State

    const originalContacts = ref(contacts)

    const displayContacts = ref(originalContacts.value.slice(0, 5))
    const sortByPopularity = computed(() => displayContacts.value.sort((a, b) => b.popularity - a.popularity));
    const sortByName = computed(() => displayContacts.value.sort((a, b) => a.name.localeCompare(b.name)));

    // Actions
    function addRandomContact() {
        const remainingContacts = originalContacts.value.filter(contact => !displayContacts.value.some(filteredContact => filteredContact.id === contact.id))
        if (remainingContacts.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingContacts.length);
          displayContacts.value.push(remainingContacts[randomIndex]);
        }
    }

    function sortContactsByPopularity() {
      displayContacts.value = sortByPopularity.value;

    }

    function sortContactsByName() {
      displayContacts.value = sortByName.value;

    }

    function deleteContact(contactId) {
      const indexToRemove = displayContacts.value.findIndex(contact => contact.id === contactId);
      if (indexToRemove !== -1) {
        displayContacts.value.splice(indexToRemove, 1);
      }
    }

    return { displayContacts, addRandomContact, sortContactsByPopularity, sortContactsByName, deleteContact }
});
