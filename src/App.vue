<template>
<body>
    <h1>Ironhack Contacts</h1>
    <button id='add-contacts' @click="addContacts">ADD RANDOM CONTACT</button>
    <button id='name-contacts' @click="sortByName">SORT BY NAME</button>
    <button id='popularity-contacts' @click="sortByPop">SORT BY POPULARITY</button>
    <button id='delete-contacts' @click="deleteContact">REMOVE CONTACT</button>
    <div id="content-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Won Oscar</th>
                    <th>Won Emmy</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in firstContacts" :key="contact.id">
                    <td><img :src="contact.pictureUrl" /></td>
                    <td><h3>{{ contact.name }}</h3></td>
                    <td><p>{{ contact.popularity }}</p></td>
                    <td><p>{{ contact.wonOscar ? '🏆' : '' }}</p></td>
                    <td><p>{{ contact.wonEmmy ? '🏆' : '' }}</p></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</template>

<script setup>
import { ref } from "vue"

const contactsArray = ref([]);
const firstContacts = ref([]);

async function fetchContacts() {
    try {
        const response = await fetch("./contacts.json");
        contactsArray.value = await response.json();
        fiveContacts();
    } catch (error) {
        console.error('Error al cargar los contactos:', error);
    }
}

function fiveContacts() {
    firstContacts.value = contactsArray.value.slice(0, 5);
}

function randomizeContact() {
    return Math.floor(Math.random() * contactsArray.value.length);
}

function addContacts() {
    const randomizedIndex = randomizeContact();
    const newContact = contactsArray.value[randomizedIndex];
    if (!firstContacts.value.includes(newContact)) {
        firstContacts.value.push(newContact);
    }
}

function sortByName() {
    firstContacts.value.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
}

function sortByPop(){
    firstContacts.value.sort(({popularity:a}, {popularity:b}) => b-a);
}

function deleteContact(){
    firstContacts.value.pop();
};

fetchContacts();
</script>

<style scoped>

#content-wrapper {
    max-width: 1200px;
    width:100vw;
    background-color:#f8f8f8;
    padding: 50px;
    margin-bottom: 50px;
    box-shadow: 0px 3px 30px rgba(0,0,0,0.15);
}

h1{
    text-align:center; 
}

table {
    width:100%;
}

table h3 {
    font-size: 25px;
}

table p {
    font-size: 18px;
}

table tr {
    display: flex; 
    justify-content: space-between;
    padding-bottom: 50px;
    padding-top: 50px;
    border-bottom: solid 1px #a1a1a1;
    flex-grow: 1;
}

table tr:last-of-type {
    border-bottom: solid 0px #a1a1a1;
}


table td {
    align-content: center;
    display:flex;

}

img {
    width: 100px;
    border-radius: 5px
}

#add-contacts {
    font-size:24px;
    position:fixed;
    top:90vh;
    width: 400px;
    right: 80px; 
    padding: 20px;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 3px 30px rgba(0,0,0,0.15);
}

#add-contacts:hover {
    background-color:gray;
}

#name-contacts {
    font-size:24px;
    position:fixed;
    top:80vh;
    width: 400px;
    right: 80px; 
    padding: 20px;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 3px 30px rgba(0,0,0,0.15);
}

#popularity-contacts {
    font-size:24px;
    position:fixed;
    top:70vh;
    width: 400px;
    right: 80px; 
    padding: 20px;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 3px 30px rgba(0,0,0,0.15);
}

#delete-contacts {
    font-size:24px;
    position:fixed;
    top:60vh;
    width: 400px;
    right: 80px; 
    padding: 20px;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 3px 30px rgba(0,0,0,0.15);
}

</style>
