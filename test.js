require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("Method", req.method);
  console.log("Url", req.originalUrl);
  next();
});

let notesArray = [];

let noteId = 0;

app.get(`/notes`, async (req, res) => {
  try {
    return res.status(200).send({ notes: notesArray });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

app.get(`/notes/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID", id);
    const note = notesArray.find((n) => n.id === Number(id));
    if (!note) {
      return res.status(404).send({ message: `Note with id ${id} not found` });
    }

    return res.status(200).send({ note });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

app.post(`/notes`, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!isValidBody(title, content)) {
      return res
        .status(400)
        .send({ message: "Bad request:Title & Content are required" });
    }
    noteId++;
    const newNote = {
      id: noteId,
      title,
      content,
    };
    notesArray.push(newNote);
    return res
      .status(201)
      .send({ message: "note added successfully", note: newNote });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

app.put(`/notes/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    if (!isValidBody(title, content)) {
      return res
        .status(400)
        .send({ message: "Bad request:Title & Content are required" });
    }
    const note = notesArray.find((n) => n.id === Number(id));
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    const updatedNotes = notesArray.map((n) => {
      if (n.id === Number(id)) {
        n["title"] = title;
        n["content"] = content;
        return n;
      } else return n;
    });

    return res.status(200).send({ message: "Note updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

app.delete(`/notes/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const note = notesArray.find((n) => n.id === Number(id));
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }
    notesArray = notesArray.filter((n) => n.id !== Number(id));
    return res.status(200).send({ message: "note deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

const isValidBody = (title, content) => {
  console.log("TITLE", title);
  console.log("CONTEnt", content);

  if (!title || !content) {
    return false;
  }
  if (!title?.trim()?.length || !content?.trim()?.length) {
    return false;
  }
  return true;
};
app.listen(port, () => console.log(`Server is running on port ${port}`));
