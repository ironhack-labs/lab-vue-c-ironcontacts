<script setup>
import { ref } from "vue";
import contacts from "./contacts.json";

const disponibles = ref([...contacts]);

const contactos = ref(disponibles.value.splice(0, 5));

function addContac() {
  const indiceAleatorio = Math.floor(Math.random() * disponibles.value.length);

  const contactoAleatorio = disponibles.value.splice(indiceAleatorio, 1)[0];

  contactos.value.push(contactoAleatorio);
}



function orderPopu() {
  contactos.value.sort((a, b) =>
    b.popularity - a.popularity
  );
}


function orderName() {
  contactos.value.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function deleteContact(contacId) {
  contactos.value = contactos.value.filter(
    con => con.id !== contacId
  )
}

</script>

<template>
  <div class="actions">
  <button @click="addContac">Add contacto</button>
  <button @click="orderName">orderName</button>
  <button @click="orderPopu">orderPopu</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won an Oscar</th>
        <th>Won an emmy</th>
        <th>Delete</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="contacto in contactos" :key="contacto.id">
        <td>
          <img :src="contacto.pictureUrl" :alt="contacto.name" width="100" />
        </td>

        <td>
          {{ contacto.name }}
        </td>

        <td>
          {{ contacto.popularity }}
        </td>
        <td>
          {{ contacto.wonOscar ? "🏆" : "" }}
        </td>
        <td>
          {{ contacto.wonEmmy ? "🌟" : "" }}
        </td>
        <td>
          <button @click="deleteContact(contacto.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(to right, #eef2ff, #f8fafc);
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
}

#app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
}

/* NAV */

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background-color: #111827;
  padding: 20px;
  border-radius: 18px;
  margin-bottom: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  position: sticky;
  top: 20px;
  z-index: 100;
}

.actions button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
}

.actions button:hover {
  background-color: #1d4ed8;
  transform: translateY(-3px);
}

/* TABLE */

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

thead {
  background-color: #111827;
  color: white;
}

th {
  padding: 18px;
  text-align: left;
  font-size: 14px;
  letter-spacing: 0.5px;
}

td {
  padding: 18px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

tbody tr {
  transition: all 0.2s ease;
}

tbody tr:hover {
  background-color: #f9fafb;
  transform: scale(1.005);
}

/* IMAGES */

img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* DELETE BUTTON */

td button {
  background-color: #dc2626;
  box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
}

td button:hover {
  background-color: #b91c1c;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .actions {
    flex-direction: column;
    position: static;
  }

  .actions button {
    width: 100%;
  }

  table {
    font-size: 14px;
  }

  th,
  td {
    padding: 12px;
  }

  img {
    width: 70px;
    height: 70px;
  }
}
</style>
