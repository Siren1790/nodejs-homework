const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

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

  async removeContact(contactId) {
    const contacts = await this.listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const result = contacts.splice(index, 1);
    await fs.writeFile(this.path, JSON.stringify([...contacts], null, 2));
    return result;
  }

  async updateContact(id, data) {
    const contacts = await this.listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...data };
    await fs.writeFile(this.path, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }

  async addContact(data) {
    const contacts = await this.listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(this.path, JSON.stringify(contacts, null, 2));
    return newContact;
  }
}

const ContactRequests = new ContactsApi(contactsPath);

module.exports = ContactRequests;