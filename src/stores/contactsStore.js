import { defineStore } from "pinia";
import { ref, watch } from "vue";
import Contacts from "../contacts.json";

export const useContactsStore = defineStore("contactsID", () => {
	const contacts = ref(Contacts);
	const displayContactsArray = ref(contacts.value.slice(0, 5));

	function getRandomContact() {
		const unusedContacts = contacts.value.filter(
			(contact) =>
				!displayContactsArray.value.find(
					(contactTwo) => contactTwo.id === contact.id
				)
		);
		return unusedContacts[
			Math.floor(Math.random() * unusedContacts.length)
		];
	}

	function addRandomContact() {
		const newContact = getRandomContact();
		displayContactsArray.value.push(newContact);
	}

	function sortByPopularity() {
		displayContactsArray.value = displayContactsArray.value.sort(
			(a, b) => b.popularity - a.popularity
		);
	}

	function sortByName() {
		displayContactsArray.value = displayContactsArray.value.sort((a, b) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	}

	function deleteContact(id) {
		displayContactsArray.value = displayContactsArray.value.filter(
			(contact) => contact.id !== id
		);
	}

	watch(contacts, () => {
		displayContactsArray.value = contacts.value.slice(0, 5);
	});

	return {
		contacts,
		displayContactsArray,
		addRandomContact,
		sortByPopularity,
		sortByName,
		deleteContact,
	};
});
