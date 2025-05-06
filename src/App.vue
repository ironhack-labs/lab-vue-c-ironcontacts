
<script setup>
  import { ref } from 'vue';
  import contacts from "./contacts.json";


  const contactsList = ref(contacts.slice(0, 6));


  const addRandomContact = () => {
    const remainingContacts = contacts.filter(contact => !contactsList.value.some(c => c.id === contact.id))

    if(remainingContacts.length > 0) {
      const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)]
      contactsList.value.push(randomContact)
    }
  }
  
  const sortByName = () => {
    contactsList.value.sort((a, b) => a.name.localeCompare(b.name))

  }

  const sortByPopularity = () => {
    contactsList.value.sort((a, b) => b.popularity - a.popularity)

  }

  const removeContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      contactsList.value = contactsList.value.filter(contact => contact.id !== id);

    }

  }


</script>


<template>

  <h1>IronContacts</h1>
  <button @click="addRandomContact" class="button">Add Random Contact</button>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name <button @click="sortByName"> A - Z </button> </th>
        <th>Popularity <button @click="sortByPopularity"> 🠗 </button> </th>
        <th>Oscar</th>
        <th>Emmy</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contactsList" :key="contact.id">
        <td><img :src="contact.pictureUrl" alt="contact picture" /></td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity }}</td>
        <td> <span v-if="contact.wonOscar"> 🏆 </span></td>
        <td> <span v-if="contact.wonEmmy"> 🏆 </span></td>
          <button class="deleteButton" @click="removeContact(contact.id)"> 🗑️ </button>
      </tr>
    </tbody>
  </table>

</template>


<style>
  h1 {
  text-align: center;
  font-size: 4rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.button {
  margin-left: 10%;
  margin-bottom: 1rem;
  padding: 0.5rem;

}

.deleteButton {
  margin-top: 3rem;
  margin-left: 2rem;
}

.deleteButton:hover {
  background-color: rgb(246, 111, 111); /* Rojo para resaltar el peligro */
  transform: scale(1.2); /* Aumenta ligeramente el tamaño */
  border: solid black 1px;
}

table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  font-size: 1.5rem;
  border-bottom: 1px solid #ddd;
  
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 20%;
  object-fit: cover;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

</style>
