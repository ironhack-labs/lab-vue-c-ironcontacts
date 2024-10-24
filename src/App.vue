<template>
  <h1>Contacts</h1>
  <button @click="addRandom()">Add Random contact</button>
  <button @click="sortName()">Sort by Name</button>
  <button @click="sortPopularity()">Sort by Popularity</button>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won<br> Oscar</th>
        <th>Won<br> Emmy</th>
        <th>Delete Actor</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in fiveContacts" :key="item.id">
        <td><img :src="item.pictureUrl"></td>
        <td>{{ item.name }}</td>
        <td>{{ item.popularity }}</td>
        <td v-if="item.wonOscar">🏆</td>
        <td v-else></td>
        <td v-if="item.wonEmmy">🏆</td>
        <td v-else></td>
        <td><button @click="deleteActor(item.id)">Delete Actor</button></td>
      </tr>
    </tbody>


  </table>
</template>

<script setup>
import contacts from "./contacts.json";
import { ref } from "vue";
let fiveContacts = ref([
  contacts[0],
  contacts[1],
  contacts[2],
  contacts[3],
  contacts[4],
]
)
console.log(fiveContacts.value)
// console.log(fiveContacts[0].pictureUrl.value)
function addRandom(){
  let remainingContacts = contacts.filter(contact => !fiveContacts.value.includes(contact));
  const randomIndex= Math.floor(Math.random()*remainingContacts.length);
  fiveContacts.value.push(contacts[randomIndex])
}
function sortName(){
  console.log("sorting")
  fiveContacts.value.sort((a,b)=>a.name.localeCompare(b.name));
}
function sortPopularity(){
  console.log("sorting")
  fiveContacts.value.sort((a,b)=>b.popularity-a.popularity);
}
function deleteActor(idToRemove){
  console.log("deleting")
  fiveContacts.value=fiveContacts.value.filter(item => item.id !== idToRemove);
}
</script>

<style>
h1{
  text-align: center;
}
img{
  max-width: 40px;
}
table{
  text-align: center;
}
button{
  text-align: center;
  align-items: center;
  
}
</style>
