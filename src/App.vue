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

onMounted(loadContacts);
</script>

<template>
  <div>
    <h1>Contactos</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="contact in contacts" :key="contact.id">
        {{ contact.name }} - {{ contact.popularity }}
      </li>
    </ul>
  </div>
</template>

<style>
</style>
