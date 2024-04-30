<script setup>
import { useContactsStore } from "./stores/contactsStore.js";
import { storeToRefs } from "pinia";
const contactsStore = useContactsStore();
const { contacts, displayContactsArray } = storeToRefs(contactsStore);
const { addRandomContact, sortByPopularity, sortByName, deleteContact } =
	contactsStore;
console.log(displayContactsArray.value);
</script>
<template>
	<button class="header-button" @click="addRandomContact">
		Add Random Contact
	</button>
	<button class="header-button" @click="sortByPopularity">
		Sort by Popularity
	</button>
	<button class="header-button" @click="sortByName">Sort by Name</button>
	<table>
		<thead>
			<tr>
				<th>Picture</th>
				<th>Name</th>
				<th>Popularity</th>
				<th>Won Oscar</th>
				<th>Won Emmy</th>
				<th></th>
			</tr>
		</thead>
		<tbody id="contactList">
			<tr v-for="contact in displayContactsArray" :key="contact.id">
				<td>
					<img
						:src="contact.pictureUrl"
						:alt="`profile image of actor ${contact.name}`" />
				</td>
				<td>
					<p>{{ contact.name }}</p>
				</td>
				<td>
					<p>{{ contact.popularity.toFixed(2) }}</p>
				</td>
				<td>
					<p>{{ contact.wonOscar ? "🏆" : "" }}</p>
				</td>
				<td>
					<p>{{ contact.wonEmmy ? "🏆" : "" }}</p>
				</td>
				<td>
					<button
						class="delete-btn"
						@click="deleteContact(contact.id)">
						Delete
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
img {
	max-width: 100px;
	max-height: 100px;
}

table {
	width: 50%;
	border-collapse: collapse;
}
th,
td {
	padding: 8px;
	text-align: left;
	border-bottom: 1px solid #ddd;
}
th {
	background-color: #f2f2f2;
}

.header-button {
	display: inline-block;
	padding: 10px 20px;
	margin: 25px 10px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	transition: background-color 0.3s;
}
.header-button:hover {
	background-color: #45a049;
}
.delete-btn {
	display: inline-block;
	padding: 10px 20px;
	margin: 25px 10px;
	background-color: #f44336;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	transition: background-color 0.3s;
}
.delete-btn:hover {
	background-color: #d32f2f;
}
</style>
