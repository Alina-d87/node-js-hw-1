const contacts = require("./contacts");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.table(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact({
        name,
        email,
        phone,
      });
      console.table(newContact);
      break;
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);

//invokeAction({ action: "list" });
//invokeAction({ action: "get", id: "5" });
//invokeAction({
//  action: "add",
//  name: "Mango",
//  email: "mango@gmail.com",
//  phone: "322-22-22",
//});
//invokeAction({ action: "remove", id: "3" });

//# Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
//node index.js --action="list"

//# Отримуємо контакт по id
//node index.js --action="get" --id=5

//# Додаємо контакт
//node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

//# Видаляємо контакт
//node index.js --action="remove" --id=3
