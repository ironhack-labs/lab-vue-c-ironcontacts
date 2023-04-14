<template>
  <div class="app">
    <h1>IronContacts</h1>
    <button @click="addRandomContact()"> Add contact </button>
    <button>Sort by popularity</button>
    <button>Sort by name</button>
    <table class=" table table-hover">
      <thead class="table-dark">
        <tr>

          <th scope="col">Picture</th>
          <th scope="col">Name</th>
          <th scope="col">Popularity</th>
          <th scope="col">Won an Oscar</th>
          <th scope="col">Won an Emmy</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in contacts" :key="item.id">

          <td><img :src="item.pictureUrl" alt="{{ item.name }}" style="width: 50px"></td>
          <td>{{ item.name }}</td>
          <td>{{ item.popularity.toFixed(2) }}</td>
          <td v-if="item.wonOscar === true">✌️</td>
          <td v-if="item.wonEmmy === true">✌️</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import contactsData from './contacts.json';
import { ref } from 'vue';

let contacts = ref(contactsData.slice(0, 5));
let restContacts = ref(contactsData.slice(6));

const addRandomContact = () => {
  let randomContact = restContacts.value[Math.floor(Math.random() * (restContacts.value.length - 1))];
  console.log(randomContact);
  return contacts.value.push(randomContact);
}

// const byPopularity = () => {
//   const popularity = contacts.map((contact) => contact.popularity);
//   console.log(popularity)
// }
// byPopularity();
</script>

<style></style>
