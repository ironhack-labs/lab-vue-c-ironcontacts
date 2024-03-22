<script setup>
import { useContactsStore } from "./store/store.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const contactsStore = useContactsStore();

const { contactsToShow, sortByName, sortByPopularity } = storeToRefs(contactsStore); 
const contacts = ref(contactsToShow);

function showSortByName(){
  contacts.value = sortByName.value;
}
function showSortByPopularity(){
  contacts.value = sortByPopularity.value;
}
function removeContact(name){
  contactsStore.removeContact(name);
}

</script>
<template>
  <div>
    <h1>IronContacts</h1>
    <button @click="contactsStore.addContactRandomly()">Add Random Contact</button>
    <button @click="showSortByName()">Sort By Name</button>
    <button @click="showSortByPopularity()">Sort By Popularity</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(contact, index) in contacts" :key="index">
          <td>
            <img
              :src="contact.pictureUrl"
              :alt="'Imagen de ' + contact.name"

            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
          <td>{{ contact.wonEmmy ? "🏆" : "" }}</td>
          <td>
            <button @click="removeContact(contact.name)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

  h1 {
    text-align: center;
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 20px;
    font-family: "Times New Roman", Times, serif;
    color :fuchsia;
   }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
    border: 2px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
  }

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 2px solid #ddd;
  }

  th {
    background-color:aquamarine;
    color: fuchsia;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  button {
    background-color:deeppink;
    color: aquamarine;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin: 0 10px;
  }

  button:hover {
    background-color: pink;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.2);
  }
</style>
