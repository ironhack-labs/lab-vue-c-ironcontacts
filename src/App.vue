<script setup>
import { ref } from "vue";
import jsonF from "./contacts.json";



let fiveContacts = ref([jsonF[0], jsonF[1], jsonF[2], jsonF[3], jsonF[4]]);

function addRandomContact() {
  contacts.value.push(jsonF[Math.floor(Math.random() * jsonF.length)]);
}

function orderByName() {
  fiveContacts.value.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    
    return 0;
  });
}

function orderByPopularity() {
  fiveContacts.value.sort((a, b) => b.popularity - a.popularity);
}

function deleteContact(id) {
  
  fiveContacts.value.forEach((contact, index) => {
    if (contact.id === id) {
      
      fiveContacts.value.push(fiveContacts.value.splice(index, 1)[0]);
      fiveContacts.value.pop();
    }
  });
}
</script>

<template>
  <div>
    <h1>Five Contacts</h1>
    <h2>Exercice 1</h2>
    <table>
      <thead>
        <th>
          <strong>Picture</strong>
        </th>
        <th><strong>Name</strong></th>
        <th><strong>Popularity</strong></th>
      </thead>
      <tbody>
        <tr v-for="contact in fiveContacts">
          <td><img class="normal-size" :src="contact.pictureUrl" alt="" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
        </tr>
      </tbody>
    </table>
    <h2>Exercice 2</h2>
    <table>
      <thead>
        <th>
          <strong>Picture</strong>
        </th>
        <th><strong>Name</strong></th>
        <th><strong>Popularity</strong></th>
        <th><strong>Oscar</strong></th>
        <th><strong>Emmy</strong></th>
      </thead>
      <tbody>
        <tr v-for="contact in fiveContacts">
          <td><img class="normal-size" :src="contact.pictureUrl" alt="" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
    <h2>Exercice 3</h2>
    <button @click="addRandomContact">Add random contact</button>
    <table>
      <thead>
        <th>
          <strong>Picture</strong>
        </th>
        <th><strong>Name</strong></th>
        <th><strong>Popularity</strong></th>
        <th><strong>Oscar</strong></th>
        <th><strong>Emmy</strong></th>
      </thead>
      <tbody>
        <tr v-for="contact in fiveContacts">
          <td><img class="normal-size" :src="contact.pictureUrl" alt="" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
    <h2>Exercice 4</h2>
    <button @click="addRandomContact">Add random contact</button>
    <button @click="orderByName">Order By Name</button>
    <button @click="orderByPopularity">Order By Popularity</button>
    <table>
      <thead>
        <th>
          <strong>Picture</strong>
        </th>
        <th><strong>Name</strong></th>
        <th><strong>Popularity</strong></th>
        <th><strong>Oscar</strong></th>
        <th><strong>Emmy</strong></th>
      </thead>
      <tbody>
        <tr v-for="contact in fiveContacts">
          <td><img class="normal-size" :src="contact.pictureUrl" alt="" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
    <h2>Exercice 5</h2>
    <button @click="addRandomContact">Add random contact</button>
    <button @click="orderByName">Order By Name</button>
    <button @click="orderByPopularity">Order By Popularity</button>
    <table>
      <thead>
        <th>
          <strong>Picture</strong>
        </th>
        <th><strong>Name</strong></th>
        <th><strong>Popularity</strong></th>
        <th><strong>Oscar</strong></th>
        <th><strong>Emmy</strong></th>
        <th><strong>Actions</strong></th>
      </thead>
      <tbody>
        <tr v-for="contact in fiveContacts">
          <td><img class="normal-size" :src="contact.pictureUrl" alt="" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #22374d;
  margin-top: 60px;
}

.normal-size {
  width: 120px;
}
</style>
