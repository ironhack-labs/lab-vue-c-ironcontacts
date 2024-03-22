// store.js
import { defineStore } from 'pinia';
import contactData from '../contacts.json';
import { computed, ref } from 'vue'

export const useContactsStore = defineStore('contacts', () => {
    // state
    const contacts = ref(contactData);
    const contactsToShow = ref(contactData.slice(0, 5));

    // Getters
    const sortByName = computed(() => {
        return contactsToShow.value.sort((a, b) => a.name.localeCompare(b.name));
    })

    const sortByPopularity = computed(() => {
        return contactsToShow.value.sort((a, b) => b.popularity - a.popularity);
    })

    // Actions 
    function addContactRandomly() {
        const contactsRemaining = contacts.value.filter(contact => !contactsToShow.value.includes(contact));
        if (contactsRemaining.length > 0) {
            const newContact = contactsRemaining[Math.floor(Math.random() * contactsRemaining.length)];
            console.log('Adding Contact')
            contactsToShow.value.push(newContact);
        } else {
            console.log("Not more contacts to show");
        }
    }
    function removeContact(name) {
        const index = contactsToShow.value.findIndex(contact => contact.name === name);
        contactsToShow.value.splice(index, 1);
    }
    
    return {
        contactsToShow,
        sortByName,
        sortByPopularity,
        addContactRandomly,
        removeContact
    }
});
