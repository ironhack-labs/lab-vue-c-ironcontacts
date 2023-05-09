<template>
  <div class="mainContainer">
    <div>
      <h1>Iron Contacts</h1>
      <button @click="handleRandom">Add Random Contact</button>
      <button @click="handleSortName">Sort by Name</button>
      <button @click="handleSortPopular">Sort by Popularity</button>
    </div>
    <table>
      <thead>
        <td class="tableHead">Picture</td>
        <td class="tableHead">Name</td>
        <td class="tableHead">Popularity</td>
        <td class="tableHead">Won an Oscar</td>
        <td class="tableHead">Won an Emmy</td>
      </thead>
      <tr v-for="(contact, index) in contacts" :key="contact.id">
        <td><img :src="contact.pictureUrl" class="tableImg"></td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity }}</td>
        <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
        <td>{{ contact.wonEmmy ? "🏆" : "" }}</td>
        <td><button @click="handleDelete(index)">Delete Contact</button></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import contactsData from '../src/contacts.json'

const contacts = ref(contactsData.slice(0, 5))
const extraContacts = ref(contactsData.slice(5))

const handleRandom = () => {
  console.log(extraContacts.value)
  console.log(contacts.value)
  contacts.value.unshift(extraContacts.value[Math.floor(Math.random()*extraContacts.value.length)])
  //contacts.value.unshift(extraContacts.value[Math.floor(Math.random() * extraContacts.length)])
}

const handleSortName = () => {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name))
  return contacts
}
const handleSortPopular = () => {
  contacts.value.sort(function (a, b) {
    if (a.popularity < b.popularity) {return 1;}
    if (a.popularity > b.popularity) {return -1;}
    return 0;
  })
  return contacts
}

const handleDelete = (index) => {
  contacts.value.splice(index, 1);
}


/* const insertRandom = () => {
  console.log("entra")
  contacts.unshift(randomContact)
} */

</script>

<style>
.tableHead {
  font-size: larger;
  font-weight: 700;
}

.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tableImg {
  width: 100px;
}
</style>
