<template>
  <div class="app">
    <h1>IronContacts</h1> 
    <button @click="addRandomContact">Add Contact</button>
    <button @click="sortByName">Sort by Name</button>
    <button @click="sortByPopularity">Sort by Popularity</button><br>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td><img :src="contact.pictureUrl" :alt="contact.name" width="100" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '❌' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '❌' }}</td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>

        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
// import ref sirve para crear una variable reactiva. las variables reactivas son para actualizar cualquier cambio de la varibale en la interfaz del ususario
import { ref } from 'vue'
import contactsData from './contacts.json'
// slice metodo array para llamar una parte de los datos de un array 
const contacts = ref(contactsData.slice(0, 5)) //contactData significa que solo es una porción del array. 
//addrandomContact es una función que añade un contacto aleatorio a la lista de contactos
const addRandomContact = () => {
  const remainingContacts = contactsData.filter(
    (contact) => !contacts.value.includes(contact)
  );
  if (remainingContacts.length === 0) return;
  const randomIndex = Math.floor(Math.random() * remainingContacts.length);
  contacts.value.push(remainingContacts[randomIndex]);
};
//Añadimos la funcion de sortear por nombre y por popularidad
const sortByName = () => {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByPopularity = () => {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
};
// deleteContact es una función que elimina un contacto de la lista de contactos
// filter es un método de array que crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada
const deleteContact = (id) => {
  contacts.value = contacts.value.filter((contact) => contact.id !== id);
};
</script>


<style scoped>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}
button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
table {
  width: 100%;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
img {
  border-radius: 8px;
}
</style>
