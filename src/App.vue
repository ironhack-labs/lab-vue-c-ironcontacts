<template>
  <div class="page">
    <h1>IronContacts</h1>

    <div class="controls">
      <button @click="addRandomContact" :disabled="!hasRemaining">
        Add Random Contact
      </button>
      <button @click="sortByName">Sort by name</button>
      <button @click="sortByPopularity">Sort by popularity</button>
    </div>

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
          <td>
            <img :src="contact.pictureUrl" :alt="contact.name" class="avatar" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>
            <span v-if="contact.wonOscar">🏆</span>
          </td>
          <td>
            <span v-if="contact.wonEmmy">🏆</span>
          </td>
          <td>
            <button class="delete" @click="deleteContact(contact.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import allContacts from "./contacts.json";

const contacts = ref(allContacts.slice(0, 5));

const remaining = computed(() =>
  allContacts.filter((c) => !contacts.value.some((shown) => shown.id === c.id))
);

const hasRemaining = computed(() => remaining.value.length > 0);

function addRandomContact() {
  const pool = remaining.value;
  if (pool.length === 0) return;
  const randomIndex = Math.floor(Math.random() * pool.length);
  contacts.value.push(pool[randomIndex]);
}

function sortByName() {
  contacts.value = [...contacts.value].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function sortByPopularity() {
  contacts.value = [...contacts.value].sort(
    (a, b) => b.popularity - a.popularity
  );
}

function deleteContact(id) {
  contacts.value = contacts.value.filter((c) => c.id !== id);
}
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f5f6fa;
  color: #2c3e50;
}

.page {
  max-width: 960px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.controls {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

button {
  padding: 0.55rem 1.1rem;
  border: none;
  border-radius: 6px;
  background-color: #42b883;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: #369f6b;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

button.delete {
  background-color: #e74c3c;
}

button.delete:hover {
  background-color: #c0392b;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f0f1f5;
  font-weight: 600;
}

.avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
