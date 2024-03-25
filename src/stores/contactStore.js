import { defineStore } from "pinia";
import { ref, computed } from "vue"; 
import Contacts from "../contacts.json";

export const useContactStore = defineStore('contacts',() => {

    //State
    const allContacts = ref(Contacts);
    
    const firstFiveContacts = computed(() => allContacts.value.slice(0, 5));
    const sortedByPopularity = computed(() => allContacts.value.slice().sort((a, b) => b.popularity - a.popularity));
    const sortedByName = computed(() => allContacts.value.slice().sort((a, b) => a.name.localeCompare(b.name)));
    const sortedByPicture = computed(() => allContacts.value.slice().sort((a, b) => a.picture.localeCompare(b.picture)));

    //Actions
    function addRandomContact() {
        const randomIndex =  Math.floor(Math.random() * Contacts.length);
        const randomContact = Contacts[randomIndex];
            allContacts.value.push(randomContact);
    }

    function sortedContactsPopularity() {
        allContacts.value = sortedByPopularity.value
    }

    function sortedContactsName (){
        allContacts.value = sortedByName.value
    }

    function deleteContact (contactId){
        const contactToRemove =  allContacts.value.findIndex(contact => contact.id === contactId);
        if ( contactToRemove !==-1){
            allContacts.value.splice(contactToRemove, 1)
            console.log("Contact deleted:", allContacts.value);
        }       
    }



    return {
        //State
        allContacts,
        firstFiveContacts,
        sortedByPopularity,
        sortedByName,
        sortedByPicture,
        
        //Actions
        addRandomContact,
        sortedContactsPopularity,
        sortedContactsName,
        deleteContact,
    };
});