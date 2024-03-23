// IMPORTS
import { ref, computed } from 'vue';
import allContacts from '@/contacts.json'
import { defineStore } from 'pinia'

export const contactsStore = defineStore('contacts', () => {
  // STATE - Variables
  const contactsToShow = ref(allContacts.slice(5, 10));


  // GETTERS - Computed variables

  // Iteration 4: sort by name and popularity
  const contactsByName = computed(() => {
    return contactsToShow.value.sort((a,b) => a.name.localeCompare(b.name))
  })

  const contactsByPopularity = computed(() => {
    return contactsToShow.value.sort((a,b) => b.popularity - a.popularity)
  })

  // ACTIONS - Functions
  // Iteration 3: Add new random contacts
  const addNewRandomContact = () => {
    const contactsNotShown = ref(allContacts.filter(con => !contactsToShow.value.includes(con)));
    if (contactsNotShown.value.length > 0) {
      const newContact = ref(contactsNotShown.value[Math.floor(Math.random() * contactsNotShown.value.length)])
      contactsToShow.value.push(newContact.value)
    }
    else {
      alert('No more contacts to show. All of them are already displayed')
    }
  }


  // Iteration 4: sort by name and popularity

  const sortByName = () => {
    contactsToShow.value = contactsByName.value
  }

  const sortByPopularity = () => {
    contactsToShow.value = contactsByPopularity.value
  }

  // Iteration 5: Delete contact
  const deleteContact = (idToDelete) => {
    contactsToShow.value = contactsToShow.value.filter(con => con.id !== idToDelete)
  }

  return {
    // State
    contactsToShow,
    // Actions
    addNewRandomContact,
    sortByName,
    sortByPopularity,
    deleteContact
  }
})
