const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const replaceFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const { nanoid } = require("nanoid");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const idContact = String(contactId);
    const contacts = await listContacts();
    const getContact = contacts.find((contact) => contact.id === idContact);
    return getContact || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const idContact = String(contactId);
    const contacts = await listContacts();
    const indexContact = contacts.findIndex(
      (contact) => contact.id === idContact
    );
    if (indexContact === -1) {
      return null;
    }
    const [result] = contacts.splice(indexContact, 1);
    await replaceFile(contacts);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await replaceFile(contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  replaceFile,
};
