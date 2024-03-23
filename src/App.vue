<template>
  <header>
    <h1>IronContacts</h1>
  </header>
  <section>
    <button @click="addNewRandomContact">Add Random Contact</button>
  </section>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(con, index) in contactsToShow" :key="index">
        <td><img :src="con.pictureUrl" :alt="con.name"></td>
        <td>{{ con.name }}</td>
        <td>{{ con.popularity }}</td>
        <td v-if="con.wonOscar === true">🏆</td>
        <td v-if="con.wonEmmy === true">🏆</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { ref } from 'vue';
  import allContacts from '@/contacts.json'

  const contactsToShow = ref(allContacts.slice(5, 10));

  const addNewRandomContact = () => {
    const contactsNotShown = ref(allContacts.filter(con => !contactsToShow.value.includes(con)));
    if (contactsNotShown.value.length > 0) {
      const newContact = ref(contactsNotShown.value[Math.floor(Math.random() * contactsNotShown.value.length)])
      contactsToShow.value.push(newContact.value)
    }
    else {
      alert('No more contacts to show. All of them are already displayed')
    }

  }

</script>

<style scoped>
  img {
    max-height: 100px;
  }
</style>

