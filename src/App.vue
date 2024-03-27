<script setup>
import { ref, onMounted } from 'vue';
import { useContactsStore } from '@/stores/contactsStore';

const contactsStore = useContactsStore()

// Estados reactivos para contactos y error
const contacts = ref([]);
const error = ref(null);

// Función para cargar los contactos
const loadContacts = async () => {
  try {
    await contactsStore.loadContacts();
    contacts.value = contactsStore.contacts;
  } catch (e) {
    error.value = e.message;
  }
};

// Ejecutar la función cuando el DOM esté disponible
onMounted(loadContacts);
</script>

<template>
  <div>
    <h1>Contactos</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Popularidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contactsStore.firstFiveNames" :key="contact.id">
          <td><img :src="contact.pictureUrl" :alt="contact.name" style="width: 70px; height: auto;"></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
body {
  font-family: sans-serif;
}
</style>
