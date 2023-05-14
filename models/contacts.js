const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

class ContactsApi {
  constructor(path) {
    this.path = path;
  }

  async listContacts() {
    const contacts = await fs.readFile(this.path);
    return JSON.parse(contacts);
  }

  async getContactById(contactId) {
    const contacts = await this.listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  }
}

const ContactRequests = new ContactsApi(contactsPath);

module.exports = ContactRequests;
// const listContacts = async () => {}

// const getContactById = async (contactId) => {};

// const removeContact = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
