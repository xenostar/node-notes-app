const fs = require("fs");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Cannot add note with duplicate title.");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  if (notes.length !== 0) {
    const newNotes = notes.filter((note) => note.title !== title);

    if (newNotes.length === notes.length) {
      console.log("No note with that title was found.");
    } else {
      saveNotes(newNotes);
      console.log(`Note (${title}) was removed.`);
    }
  } else {
    console.log("There are no notes to remove.");
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = { getNotes, addNote, saveNotes, removeNote };
