<script setup>
import { useContactsStore } from "./store/contactStore.js";
import { storeToRefs } from "pinia";

const contactsStore = useContactsStore();

const { addRandomContact, deleteContact, sortContactsByPopularity, sortContactsByName } = contactsStore
const { displayContacts } = storeToRefs(contactsStore);
  
</script>


<template>
  <div class="container">
    <h1 class="h1">Contacts</h1>
    <div>
      <button @click="addRandomContact()" class="btn btn-outline-primary">Add Random Contact</button>
      <button @click="sortContactsByName()" class="btn btn-outline-primary">Sort by Name</button>
      <button @click="sortContactsByPopularity()" class="btn btn-outline-primary">Sort by Popularity</button>
    </div>
    <div class="table-responsive"> 
      <table class="container text-center">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contact, index) in displayContacts" :key="index">
            <td class="col-2"><img :src="contact.pictureUrl" alt="Contact Picture" style="width: 100px; height: 100px;"
                class="rounded"></td>
            <td class="col-2">{{ contact.name }}</td>
            <td class="col-2">{{ contact.popularity }}</td>
            <td class="col-2">{{ contact.wonOscar ? '🏆' : '' }}</td>
            <td class="col-2">{{ contact.wonEmmy ? '🏆' : '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
button {
  margin: 5px;
  margin-bottom: 15px;
}

.h1 {
  color: #0d6efd;
}

.rounded {
  margin-bottom: 1rem;
}
</style>