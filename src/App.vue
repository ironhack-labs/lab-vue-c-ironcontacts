<script setup>
import { useContactsStore } from "./stores/contacts";

const store = useContactsStore()
</script>


<template>
    <div class="app">
        <h1>IronContacts</h1>
        <div class="btns">
            <button @click="store.addRandomContact">Add Contact Button</button>
            <button @click="store.toggleSortByName">Sort by Name</button>
            <button @click="store.toggleSortByPopularity">Sort by Popularity</button>
        </div>
        <table>
        <thead>
            <tr>
            <th class="title">Picture</th>
            <th class="title">Name</th>
            <th class="title">Popularity</th>
            <th class="title">Won an Oscar</th>
            <th class="title">Won an Emmy</th>
        </tr>
        </thead>
        <tbody>
            <tr class="contacts-list" v-for="(contact , i) in store.sortedContacts" :key="i">
            <td>
                <img :src="contact.pictureUrl" />
            </td>
            <td>{{ contact.name }}</td>
            <td>{{ parseFloat(contact.popularity).toFixed(2) }}</td>
            <td v-if="contact.wonOscar">🏆</td>
            <td v-if="contact.wonEmmy">🏆</td>
            <td>
                <button @click="store.deleteContact(contact.id)">Delete Contact</button>
            </td>
        </tr>
        </tbody>
    </table>
    </div>
</template>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}

.app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin-top: 1rem;
        padding: 2rem;
        font-size: 3rem;
    }

    .title {
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }

    td {
        font-size: 1.7rem;
        text-align: center;
    }

    img {
    height: 10rem;
    }

    .btns {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    button {
        height: 40px;
        width: 80px;
    }
}
</style>
