const chalk = require("chalk");
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
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Cannot add note with duplicate title."));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesCount = notes.length;

  if (notesCount > 0) {
    const filteredNotes = notes.filter((note) => note.title !== title);

    if (filteredNotes.length === notesCount) {
      console.log(chalk.red.inverse("No note with that title was found."));
    } else {
      saveNotes(filteredNotes);
      console.log(chalk.green.inverse(`Note (${title}) was removed.`));
    }
  } else {
    console.log(chalk.yellow.inverse("There are no notes to remove."));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  if (notes.length > 0) {
    console.log(chalk.green.inverse(`Your Notes:`));
    notes.forEach((note) => console.log(` - ${note.title}`));
  } else {
    console.log(chalk.yellow.inverse(`No notes were found.`));
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

module.exports = { getNotes, addNote, saveNotes, removeNote, listNotes };
