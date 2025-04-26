import { ref, computed } from "vue";
import { defineStore } from "pinia";
import contacts from "../contacts.json";

export const useIronContactsStore = defineStore("ironcontacts", () => {
  // //STATE= data / ref
  const topContacts = ref(contacts.slice(0, 5));

  //GETTERS = computed
  const addButtonText = computed(() => {
    if (contacts.length === topContacts.value.length) {
      return "SORRY, NO MORE CONTACTS LEFT";
    }
    return "Add Random Contact";
  });

  //ACTIONS = functions
  const addContact = () => {
    if (contacts.length === topContacts.value.length) {
      return;
    }
    const existingContacts = new Set(
      topContacts.value.map((contact) => contact.id)
    );
    const remainingContacts = contacts.filter(
      (contact) => !existingContacts.has(contact.id)
    );
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    topContacts.value.unshift(randomContact);
  };

  const sortByPopularity = () => {
    topContacts.value.sort((a, b) => b.popularity - a.popularity);
  };

  const sortByName = () => {
    topContacts.value.sort((a, b) => a.name.localeCompare(b.name));
  };

  const deleteContact = (id) => {
    topContacts.value = topContacts.value.filter(
      (contact) => contact.id !== id
    );
  };

  return {
    //STATE
    topContacts,

    //GETTERS
    addButtonText,

    //ACTIONS
    addContact,
    sortByPopularity,
    sortByName,
    deleteContact,
  };
});
