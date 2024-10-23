// src/App.vue
<template>
  <div id="header">
    <h1>IronContacts</h1>
    <button @click="addRandomContact">Add random contact</button>   
  </div>

  <table class="table">
    <tr>
      <th>Picture</th>
      <th>
        Name 
        <button @click="sortName">Sort by name</button>
       </th>
      <th>
        Popularity 
        <button @click="sortPopularity">Sort by popularity</button>
      </th>
      <th>Won Oscar</th>
      <th>Won Emmy</th>
      <th>Remove</th>
    </tr>
    <tr v-for="item in contactsSliced" :key="item.id">
      <td><img :src="item.pictureUrl" class="mainPictures"></td>
      <td>{{ item.name }}</td>
      <td>{{ item.popularity }}</td>
  
      <td v-if="item.wonOscar === true">
        <img class="trophyIcon" src="https://cdn-icons-png.flaticon.com/128/206/206982.png">
      </td>
      <td v-else></td>
      
      <td v-if="item.wonEmmy === true">
        <img class="trophyIcon" src="https://cdn-icons-png.flaticon.com/128/250/250656.png">
      </td>
      <td v-else></td>

      <td><button @click="removeContact(item.id)">Remove contact</button></td>
    </tr>
  </table>
</template>


<script setup>
import contacts from "./contacts.json";
import { ref, reactive } from "vue";

const contactsSliced = reactive(contacts.slice(0,5));

function addRandomContact(){
  let remainingContacts = contacts.filter((contact) => !contactsSliced.includes(contact));
  let randomContact = remainingContacts[Math.floor(Math.random()*remainingContacts.length)];
  
  if(remainingContacts.length===0){
    alert('No more contacts to add');
  }
  else{
    contactsSliced.push(randomContact);
  }
}

function sortName(){
  contactsSliced.sort((a, b) => a.name.localeCompare(b.name));
}

function sortPopularity(){
  contactsSliced.sort((a, b) => b.popularity-a.popularity);
}

function removeContact(id){
  for (let index = 0; index < contactsSliced.length; index++) {
    if(contactsSliced[index].id === id){
      contactsSliced.splice(index, 1);
      break;
    }
  }
};
</script>


<style scoped>
td{
  width: 200px;
  text-align: center;
}

.mainPictures{
  width: 100px;
}

.trophyIcon{
  width: 50px;
}

#header{
  margin: 40px;
  text-align: center;
}
</style>