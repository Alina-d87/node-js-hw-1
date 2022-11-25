const fs = require("fs/promises");

const path = require("path");

const contactsPath = "./db/contacts.json";

// TODO: задокументувати кожну функцію
function listContacts() {
  async ({ contactsPath, action }) => {
    switch (action) {
      case read:
        const list = await fs.readFile(contactsPath);
        console.log(list);
        break;
    }
  };
}

listContacts({ contactsPath, action: "read" });

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}

module.exports = { listContacts };
