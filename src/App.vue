// src/App.vue
<template>
  <h1>IronContacts</h1>
  <div class="buttonContainer">
    <button @click="addRandomContact">Add Random Contact</button>
    <button @click="sortByPopularity">Sort by Popularity</button>
    <button @click="sortByName">Sort by Name</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
        <th>Actioons</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contactsList" :key="contact.id">
        <td>
          <img :src="contact.pictureUrl" alt="Picture of {{ contact.name }}" />
        </td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
        <td>{{ contact.wonEmmy ? "🏆" : "" }}</td>
        <td><button @click="deleteContact(contact.id)">Delete</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from "vue";
import contacts from "./contacts.json";

export default {
  setup() {
    // Crear una variable ref para los contactos
    const contactsList = ref(contacts.slice(0, 5)); // Almacena los primeros 5 contactos
    const addedContacts = ref(new Set()); // rastrear contactos ya agregados

    // Función para agregar un contacto aleatorio
    const addRandomContact = () => {
      // Filtrar contactos que no han sido agregados
      const availableContacts = contacts.filter(
        (contact) => !addedContacts.value.has(contact.id)
      );

      // Verificar si hay contactos disponibles
      if (availableContacts.length > 0) {
        // Elegir un contacto aleatorio de los disponibles
        const randomIndex = Math.floor(
          Math.random() * availableContacts.length
        );
        const randomContact = availableContacts[randomIndex];

        // Agregar el contacto aleatorio a la lista
        contactsList.value.push(randomContact);
        addedContacts.value.add(randomContact.id); // Marcar el contacto como agregado
      } else {
        alert("No more contacts to add.");
      }
    };

    const sortByPopularity = () => {
      contactsList.value.sort((a, b) => b.popularity - a.popularity);
    };

    const sortByName = () => {
      contactsList.value.sort((a, b) => a.name.localeCompare(b.name));
    };

    const deleteContact = (id) => {
      contactsList.value = contactsList.value.filter(
        (contact) => contact.id !== id
      );
      addedContacts.value.delete(id); // Opcional: eliminar del Set si es necesario
    };

    return {
      contactsList,
      addRandomContact,
      sortByPopularity,
      sortByName,
      deleteContact,
    };
  },
};
</script>

<style>
body {
  background-color: #121212;
  color: #ffffff;
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin: 20px 0;
  color: #f39c12; 
}

.buttonContainer {
text-align: center;
}


button {
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c0392b;
}


table {
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
}

th,
td {
  border: 1px solid #444; 
  padding: 12px;
  text-align: center;
  background-color: #222; 
}

th {
  background-color: #333; 
  font-size: 1.2rem;
}


img {
  width: 50px;
  border-radius: 20%; 
}

button.delete {
  background-color: #e67e22;
}

button.delete:hover {
  background-color: #d35400;
}
</style>
