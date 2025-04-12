import { defineStore } from "pinia";
import contactsInfo from "../contacts.json";
import { ref, computed } from "vue";

export const useContactsStore = defineStore('contacts', () => {
    //State
    const sortedByName = ref(false);
    const sortedByPopularity = ref(false);
    const contacts = ref(contactsInfo.slice(5, 10));

    //Getters
    const sortedContacts = computed(() => {
        let sortedList = [...contacts.value];
    
        if (sortedByName.value) {
            sortedList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortedByPopularity.value) {
            sortedList.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity))
        }
    
        return sortedList;
    });

    //Actions
    const addRandomContact = () => {
        const randomContact = contactsInfo[Math.floor(Math.random() * contactsInfo.length)];
    
        if (!contacts.value.includes(randomContact)) {
            contacts.value.push({...randomContact})
        }
    }
    
    const toggleSortByName = () => {
        sortedByName.value = !sortedByName.value;
        sortedByPopularity.value = false;
    }
    
    const toggleSortByPopularity = () => {
        sortedByPopularity.value = !sortedByPopularity.value
        sortedByName.value = false;
    }
    
    const deleteContact = (contactId) => {
        contacts.value = contacts.value.filter(c => c.id !== contactId)
    }

    return {sortedContacts, addRandomContact, toggleSortByName, toggleSortByPopularity, deleteContact }
})