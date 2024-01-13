const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let contacts = [
  { id: 1, name: "Fatu", phone: "0891234567" },
  { id: 2, name: "adzka", phone: "08912333322" },
];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// Get all contacts
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// Get a specific contact by ID
app.get("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((c) => c.id === id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

// Add a new contact
app.post("/contacts", (req, res) => {
  const { name, phone } = req.body;
  const newContact = { id: contacts.length + 1, name, phone };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Update a contact by ID
app.put("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, phone } = req.body;
  const contactIndex = contacts.findIndex((c) => c.id === id);

  if (contactIndex !== -1) {
    contacts[contactIndex] = { id, name, phone };
    res.json({ message: "Contact updated successfully" });
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

// Delete a contact by ID
app.delete("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  contacts = contacts.filter((c) => c.id !== id);
  res.json({ message: "Contact deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
