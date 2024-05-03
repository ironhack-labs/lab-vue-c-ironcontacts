import { defineStore } from "pinia";
import { ref, watch } from "vue";
import Contacts from "../contacts.json";

export const useContactsStore = defineStore("contactsID", () => {
  const contacts = ref(Contacts);
  const allContacts = ref(contacts.value.slice(0, 5));

  function getRandomContact() {
    const contactsNotInList  = contacts.value.filter(
      (contact) =>
        !allContacts.value.find(
          (contactTwo) => contactTwo.id === contact.id
        )
    );
    return contactsNotInList [Math.floor(Math.random() * contactsNotInList .length)];
  }

  function addRandomContact() {
    const newContact = getRandomContact();
    allContacts.value.push(newContact);
  }

  function sortByPopularity() {
    allContacts.value = allContacts.value.sort(
      (a, b) => b.popularity - a.popularity
    );
  }

  function sortByName() {
    allContacts.value.sort((a, b) => a.name.localeCompare(b.name));
  }

  function deleteContact(id) {
    const indexToRemove = allContacts.value.findIndex((contact) => contact.id === id);
    if (indexToRemove !== -1) {
      allContacts.value.splice(indexToRemove, 1);
    }
  }


  return {
    contacts,
    allContacts,
    addRandomContact,
    sortByPopularity,
    sortByName,
    deleteContact,
  };
});