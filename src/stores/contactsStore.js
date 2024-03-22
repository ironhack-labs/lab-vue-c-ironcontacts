import { defineStore } from "pinia";
import { ref, watch } from "vue";
import Contacts from "../contacts.json";

export const useContactsStore = defineStore("contactsID", () => {
  const contacts = ref(Contacts);
  const displayContactsArray = ref(contacts.value.slice(0, 5));

  function getRandomContact() {
    const unusedContacts = contacts.value.filter(country => !displayContactsArray.value.find(countryTwo => countryTwo.id === country.id));
    return unusedContacts[Math.floor(Math.random() * unusedContacts.length)];
  }

  function addRandomContact() {
    const newContact = getRandomContact();
    displayContactsArray.value.push(newContact);
  }

  watch(contacts, () => {
    displayContactsArray.value = contacts.value.slice(0, 5);
  });

  return {
    contacts,
    displayContactsArray,
    addRandomContact
  };
});
