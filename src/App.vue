<template>
  <div>
    <h1>Contact List</h1>
    <button @click="addRandomContact">Agregar contacto aleatorio</button>
    <button @click="sortByName">Ordenar por Nombre</button>
    <button @click="sortByPopularity">Ordenar por Popularidad</button>
    <table border="1">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Ganó un Oscar</th>
          <th>Ganó un Emmy</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td><img :src="contact.pictureUrl" :alt="contact.name" width="50" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td>
            <button @click="removeContact(contact.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import contactsData from './contacts.json';

const contacts = ref(contactsData.slice(0, 5));

// Función para agregar un contacto aleatorio
const addRandomContact = () => {
  // Filtramos los contactos restantes que no están en 'contacts'
  const remainingContacts = contactsData.filter(contact => 
    !contacts.value.some(c => c.id === contact.id)
  );

  // Si hay contactos restantes, seleccionamos uno al azar y lo agregamos a 'contacts'
  if (remainingContacts.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    contacts.value.push(remainingContacts[randomIndex]);
  } else {
    alert("No hay más contactos para agregar");
  }
};

// Función para ordenar por nombre
const sortByName = () => {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

// Función para ordenar por popularidad (de mayor a menor)
const sortByPopularity = () => {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
};

// Función para eliminar un contacto
const removeContact = (id) => {
  contacts.value = contacts.value.filter(contact => contact.id !== id);
};
</script>

<style scoped></style>
