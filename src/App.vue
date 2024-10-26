<template>
  <button v-on:click="addContact">Add new Contact</button>
  <button v-on:click="removeContact">Remove Last Contact</button>
  <table>
    <thead>
    <th>Picture</th>
    <th>Name</th>
    <th>Popularity</th>
    <th>Oscar</th>
    <th>Emmy</th>
    <th>Action</th>
  </thead>
  <tbody>
    <tr v-for="contact in contacts" v-bind:key="contact.id">
      <td><img v-bind:src=contact.pictureUrl style="width: 100px;" /></td>
      <td>{{ contact.name }}</td>
      <td>{{ contact.popularity }}</td>
      <td v-if="contact.wonOscar"> 🏆 </td>
      <td v-else> - </td>
      <td v-if="contact.wonEmmy"> 🏆 </td>
      <td v-else> - </td>
      <td><button>Delete</button></td>
    </tr>
  </tbody>
  </table>

</template>

<script setup>
import contactListSource from './contacts.json';
import { ref } from 'vue';

/** Contacts to Display */
let contacts = ref([]);
let contactList = ref([]);

/** Load contacts to the contactList array
*/
contactListSource.forEach(item => {
  contactList.value.push(item);
})

for (let i= 0; i < 5; i++){
  let element = contactList.value[i];
  contacts.value.push(element);
  contactList.value.splice(0, 1);
}

function addContact(){
  if (contactList.value.length === 0)
    alert("No more contacts")
  else{
    let randomIndex = 0;
    if (contactList.value.length > 1){
      do{
        randomIndex = Math.floor(Math.random() * contactList.value.length);
      }while(randomIndex < 0)
    }
    let element = contactList.value[randomIndex];
    contacts.value.push(element);
    contactList.value.splice(randomIndex, 1);
  }
}

function removeContact(){
  let contact = contacts.value.pop();
  contactList.value.push(contact);
}

/** */
function removeContact(element){
  let contact = contacts.value.rem;
  contactList.value.push(contact);
}

</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
