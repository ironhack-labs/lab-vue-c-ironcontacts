<script setup>
import { ref, onMounted } from "vue"

const contactsList = ref([])
const contactsAll = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/contacts.json') 
    const data = await res.json()

    contactsAll.value = data
    contactsList.value = data.slice(0, 5) 
  } catch (error) {
    console.error('Error al cargar contactos:', error)
  }
})


function addRandomContact() {
  const remaining = contactsAll.value.filter(
    contact => !contactsList.value.find(c => c.id === contact.id)
  )

  const randomIndex = Math.floor(Math.random() * remaining.length)
  const randomContact = remaining[randomIndex]

  contactsList.value.push(randomContact)
}

function sortContactsAZ() {
  contactsList.value.sort((a, b) => a.name.localeCompare(b.name))
}

function sortContactsPopularity() {
  contactsList.value.sort((a, b) =>  b.popularity - a.popularity)
}

function deleteContact(id) {
  contactsList.value = contactsList.value.filter(contact => contact.id !== id)
}

</script>

<template>
 <h1>Iron Contacts</h1>

 <div class="botones">
 <button @click="addRandomContact">Add Contact</button>
 <button @click="sortContactsAZ">Sort A-Z</button>
 <button @click="sortContactsPopularity">Sort most popular </button>
 </div>
 <table>
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th>Won a Oscar</th>
      <th>Won a Emi</th>
      <th> Delete </th>

    </tr>
    <tr v-for="contact in contactsList" :key="contactsList.id" >
      <td><img :src="contact.pictureUrl" /></td>
      <td>{{contact.name}}</td>
      <td>{{contact.popularity.toFixed(2)}}</td>
      <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
      <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
      <td> <button @click="deleteContact(contact.id)"> ❌ </button></td>

    </tr>
  
  
  </table>
  
</template>



<style>
h1{
  text-align: center;
}
.botones{
  margin: 0 auto;
  width: 30vw;
  display: flex;
  justify-content: space-between; 
}
table{
  margin: 30px auto;
}
td{
  width: 150px;
  text-align: center; 
  img{
    width: 80px;
  }
}
</style>

