# IronContacts Lab Notes

## What was done
- Implemented the main app in `src/App.vue` using the Composition API.
- Imported `src/contacts.json` and initialized the first 5 contacts.
- Rendered a table with picture, name, popularity, Oscar, Emmy, and delete action.
- Added buttons for:
  - Add Random Contact
  - Sort by Name
  - Sort by Popularity
- Implemented delete functionality for each contact.
- Added simple styling to make the app look polished and readable.

## How it works
- `contacts` starts with the first 5 entries from `contacts.json`.
- `remainingContacts` computes the contacts not currently shown.
- `addRandomContact()` picks one remaining contact randomly and adds it.
- `sortByName()` sorts contacts alphabetically.
- `sortByPopularity()` sorts contacts by highest popularity first.
- `deleteContact(id)` removes the clicked contact from the list.

## Notes for running the app
1. Run `npm install` if needed.
2. Run `npm run dev`.
3. Open the displayed local URL in the browser.

## Student checklist
- [x] Display 5 contacts from `contacts.json`
- [x] Show picture, name, popularity in a table
- [x] Display Oscar and Emmy trophy icons conditionally
- [x] Add random contact from remaining contacts
- [x] Sort contacts by name and popularity
- [x] Delete contacts from the table
- [x] Add beginner-friendly styling for presentation
