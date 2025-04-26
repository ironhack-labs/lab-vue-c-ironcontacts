<script setup>
import { storeToRefs } from 'pinia';
import { useIronContactsStore } from './stores/ironcontacts'

const store = useIronContactsStore()

const { topContacts, addButtonText } = storeToRefs(store)
const { 
  addContact,
  sortByPopularity,
  sortByName,
  deleteContact
} = store


</script>

<template>
  <h1>Iron Contacts</h1>

  <div class="buttons-container">
    <button ref="addButton" @click="addContact" class="addButton">{{ addButtonText }}</button>
    <button @click="sortByPopularity" class="sortButton">Sort By Popularity</button>
    <button @click="sortByName" class="nameButton">Sort By Name</button>
  </div>
 
  <table>
    <thead>
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th>Won Oscar</th>
      <th>Won Emmy</th>
      <th>Actions</th>
    </thead>

    <tr v-for="contact in topContacts" :key="contact.id">
      <!-- Picture -->
      <td>
        <img class="portrait" :src="contact.pictureUrl">
      </td>

      <!-- Name -->
      <td>{{ contact.name }}</td>

      <!-- Popularity -->
      <td>{{ contact.popularity.toFixed(2) }}</td>

      <!-- Won Oscar -->
      <td v-if="contact.wonOscar === true">
        <img class="trophy" src="./assets/trophy.png">
      </td>

      <td v-else>
        <p></p>
      </td>

      <!-- Won Emmy -->
      <td v-if="contact.wonEmmy === true">
        <img class="trophy" src="./assets/trophy.png">
      </td>

      <td v-else>
        <p></p>
      </td>

      <!-- Actions -->
      <td>
        <button class="deleteButton" @click="deleteContact(contact.id)">Delete</button>
      </td>
    </tr>

    
  </table>
</template>



<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


html, body {
  background: linear-gradient(90deg, #C7D7F0 0%, #FAF8C8 100%);
  width: 100%;
  min-width: 450px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-top: 10px
  
}

h1, th, td {
  color: #1A2980
}

.buttons-container {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px auto 40px
}

.addButton, .sortButton, .nameButton {
  background-image: linear-gradient(to right, #115b89 0%, #76e3e2  51%, #1A2980  100%);
  text-align: center;
  min-width: 140px;
  height: 30px;
  padding: 5px;
  border-radius: 2px;
  border: none;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;            
  box-shadow: 0 0 20px #eee;
  display: block;
}

.addButton:hover, .sortButton:hover, .nameButton:hover {
  background-position: right center; 
  color: #fff;
  text-decoration: none;

}

.deleteButton {
  text-align: center;
  min-width: 100px;
  height: 30px;
  padding: 5px;
  border-radius: 50px;
  border: none;
  background-image: linear-gradient(to right, #f6ad54 0%, #f8232a  51%, #f65954  100%);
  transition: 0.5s;
  background-size: 200% auto;
  color: white;            
  box-shadow: 0 0 20px #eee;
  display: block;
}

.deleteButton:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}         

table {
  width: auto;
  margin: 0 auto;
}

.portrait {
  width: 50px;
  border-radius: 5px
}

th, td {
  width: 100px;
  text-align: center;
}

.trophy {
  width: 35px
}
</style>