import { defineStore } from 'pinia'
import { ref } from 'vue'
import contacts from "@/contacts.json";

export const useContactsStore = defineStore('contacts', () => {

    // State

    const originalContacts = ref(contacts)
    // puede que no haga falta crear "originalContacts" y se pueda llamar directamente contacts en las 2 variables de abajo?
    const displayContacts = ref(originalContacts.value.slice(0, 5))
    const remainingContacts = ref(originalContacts.value.filter(contact => !displayContacts.value.some(fc => fc.id === contact.id)))

    // Actions
    function addRandomContact() {
        if (remainingContacts.value.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingContacts.value.length);
          displayContacts.value.push(remainingContacts.value[randomIndex]);
        //   console.log("New contact added:", displayContacts.value);
        }
    }

    function sortByPopularity() {
      displayContacts.value.sort((a, b) => b.popularity - a.popularity);
    //   console.log("Contacts sorted by popularity:", displayContacts.value);
    }

    function sortByName() {
      displayContacts.value.sort((a, b) => a.name.localeCompare(b.name));
    //   console.log("Contacts sorted by name:", displayContacts.value);
    }

    function deleteContact(contactId) {
      const indexToRemove = displayContacts.value.findIndex(contact => contact.id === contactId);
      if (indexToRemove !== -1) {
        displayContacts.value.splice(indexToRemove, 1);
        // console.log("Contact deleted:", displayContacts.value);
      }
    }

    return { displayContacts, addRandomContact, sortByPopularity, sortByName, deleteContact }
});
