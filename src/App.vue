<script setup>
import { ref, onMounted } from 'vue';
import { useContactsStore } from '@/stores/contactsStore';

const contactsStore = useContactsStore()

// Estados reactivos para contactos y error
const displayedContacts = ref([]);
const remainingContacts = ref([]);
const error = ref(null);

// RANDOM CONTACTS
const addRandomContact = () => {
  if (remainingContacts.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.value.length);
    const randomContact = remainingContacts.value.splice(randomIndex, 1)[0];
    displayedContacts.value.push(randomContact);
  } else {
    alert('No hay más contactos para añadir.');
  }
};

const initializeContacts = () => {
  displayedContacts.value = [...contactsStore.firstFiveNames];
  remainingContacts.value = [...contactsStore.contacts.slice(5)];
};

// Función para cargar los contactos
const loadContacts = async () => {
  try {
    await contactsStore.loadContacts();
    initializeContacts();
  } catch (e) {
    error.value = e.message;
  }
};

// SORTING FUNCTIONS
const sortByPopularity = () => {
  displayedContacts.value.sort((a, b) => b.popularity - a.popularity)
}

const sortByName = () => {
  displayedContacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

// DELETE CONTACT FUNCTION
const deleteContact = (contactId) => {
  displayedContacts.value = displayedContacts.value.filter(contact => contact.id !== contactId)
}


// Ejecutar la función cuando el DOM esté disponible
onMounted(() => {
  if (contactsStore.contacts.length === 0) {
    loadContacts();
  } else {
    // Si contactsStore ya tiene contactos cargados (por ejemplo, en hot reload), inicializar directamente
    initializeContacts();
  }
});

</script>

<template>
  <div>
    <h1>Contactos</h1>
    <button @click="addRandomContact">Añadir Contacto Aleatorio</button>
    <button @click="sortByPopularity">Sort by Popularity</button>
    <button @click="sortByName">Sort by Name</button>
    <div v-if="error" class="error">{{ error }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Popularidad</th>
          <th>Won Oscar</th>
          <th>Won Emy</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in displayedContacts" :key="contact.id">
          <td><img :src="contact.pictureUrl" :alt="contact.name" style="width: 60px; height: auto;"></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td class="text-center">{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td class="text-center">{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
body {
  font-family: sans-serif;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
.text-center {
  text-align: center;
}
thead {
  background-color: #f2f2f2;
}
</style>
