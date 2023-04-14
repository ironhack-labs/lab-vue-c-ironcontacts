<template>
  <div class="app container">
    <h1>IronContacts</h1>
    <div class="btn-container">
      <button type="button" class="btn btn-outline-secondary" @click="addRandomContact()"> Add contact </button>
      <button type="button" class="btn btn-outline-secondary" @click="byPopularity()">Sort by popularity</button>
      <button type="button" class="btn btn-outline-secondary" @click="byName()">Sort by name</button>
    </div>
    <table class=" table table-hover table-bordered table align-middle text-center">
      <thead>
        <tr class="thead">

          <th scope="col">Picture</th>
          <th scope="col">Name</th>
          <th scope="col">Popularity</th>
          <th scope="col">Won an Oscar</th>
          <th scope="col">Won an Emmy</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="item in contacts" :key="item.id">

          <td><img :src="item.pictureUrl" alt="{{ item.name }}" style="width: 50px"></td>
          <td>{{ item.name }}</td>
          <td>{{ item.popularity.toFixed(2) }}</td>
          <td><span v-show="item.wonOscar === true">✌️</span></td>
          <td><span v-show="item.wonEmmy === true">✌️</span></td>
          <td><button type="button" class="btn btn-outline-danger btn-sm" @click="deleteBtn(`${item.id}`)">Delete
              contact</button></td>

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

const byPopularity = () => {
  const popularityOrder = contacts.value.sort((a, b) => b.popularity - a.popularity);
  console.log(popularityOrder);
}

const byName = () => {
  const alphabeticOrder = contacts.value.sort((a, b) => {
    a = a.name.toLocaleLowerCase();
    b = b.name.toLocaleLowerCase();
    if (a === b) {
      return 0;
    }
    if (a < b) {
      return -1;
    }
    else { return 1; }
  }
  )
};

const deleteBtn = () => {
  const removed = contacts.value.splice(0, 1);
  console.log(removed);
  console.log(contacts);
  console.log(restContacts);
  return restContacts.value.push(removed.value)
}
</script>

<style scoped>
.container {
  max-width: 600px;
  text-align: center;
}

.thead {
  text-align: center;
  justify-content: center;
  background-color: #ffccb6;
  color: #ff968a;
}

img {
  border-radius: 50px;
}
</style>
