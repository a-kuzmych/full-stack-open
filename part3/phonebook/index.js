const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

let notes = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.use(express.static('dist'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/persons", (req, res) => {
  res.json(notes);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${notes.length} people</p><p>${date}</p>`,
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number is missing" });
  }
  const existingNote = notes.find((note) => note.name === body.name);

  if (existingNote) {
    return res.status(400).json({ error: "name must be unique" });
  } else {
    const newNote = {
      id: Math.floor(Math.random() * 1000000).toString(),
      name: body.name,
      number: body.number,
    };
    notes.push(newNote);
    res.status(201).json(newNote);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
