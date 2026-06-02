<template>
  <div id="app">
    <header>
      <div class="header-title">
        <h1>IronContacts</h1>
        <p>Manage the producer's movie contacts</p>
      </div>
      <div class="button-group">
        <button @click="addRandomContact" :disabled="remainingContacts.length === 0">
          Add Random Contact
        </button>
        <button @click="sortByName">Sort by Name</button>
        <button @click="sortByPopularity">Sort by Popularity</button>
      </div>
    </header>

    <section class="table-container">
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
            <td class="picture-cell">
              <img :src="contact.pictureUrl" :alt="contact.name" />
            </td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.popularity.toFixed(2) }}</td>
            <td class="award-cell">{{ contact.wonOscar ? '🏆' : '' }}</td>
            <td class="award-cell">{{ contact.wonEmmy ? '🏆' : '' }}</td>
            <td>
              <button class="delete-button" @click="deleteContact(contact.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p class="contact-count">
        Showing {{ contacts.length }} contact{{ contacts.length === 1 ? '' : 's' }}
      </p>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import contactsData from './contacts.json';

const contacts = ref(contactsData.slice(0, 5));

const remainingContacts = computed(() => {
  return contactsData.filter(
    (contact) => !contacts.value.some((current) => current.id === contact.id)
  );
});

function addRandomContact() {
  if (remainingContacts.value.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingContacts.value.length);
  const contactToAdd = remainingContacts.value[randomIndex];

  contacts.value = [...contacts.value, contactToAdd];
}

function sortByName() {
  contacts.value = [...contacts.value].sort((a, b) => a.name.localeCompare(b.name));
}

function sortByPopularity() {
  contacts.value = [...contacts.value].sort((a, b) => b.popularity - a.popularity);
}

function deleteContact(id) {
  contacts.value = contacts.value.filter((contact) => contact.id !== id);
}
</script>

<style>
#app {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1f2937;
}

header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.header-title h1 {
  margin: 0;
  font-size: clamp(2rem, 2.5vw, 3rem);
  color: #111827;
}

.header-title p {
  margin: 6px 0 0;
  color: #4b5563;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

button {
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
  color: white;
  padding: 10px 18px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 18px rgba(37, 99, 235, 0.18);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
  background: #9ca3af;
}

.table-container {
  overflow-x: auto;
  background: white;
  padding: 16px;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 680px;
}

th,
td {
  padding: 16px 14px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

thead th {
  color: #111827;
  font-weight: 700;
  letter-spacing: 0.02em;
}

tbody tr:hover {
  background: #f8fafc;
}

.picture-cell img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
}

.award-cell {
  font-size: 1.3rem;
  text-align: center;
}

.delete-button {
  background: #ef4444;
  border-radius: 999px;
  padding: 10px 16px;
}

.delete-button:hover {
  background: #dc2626;
}

.contact-count {
  margin: 16px 0 0;
  color: #374151;
  font-weight: 600;
}

@media (max-width: 720px) {
  header {
    flex-direction: column;
    align-items: stretch;
  }

  .button-group {
    justify-content: stretch;
  }

  th,
  td {
    padding: 12px 10px;
  }
}
</style>
