const fs = require('fs');
const chalk = require('chalk');

const NOTES_PATH = "notes.json"

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    // Save to file only if title is unique
    if (title.length === 0) {
        console.log(chalk.red.inverse('Title cannot be empty!'));
    } else if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note with same title already exists!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesDeleted = notes.filter((note) => note.title !== title);

    saveNotes(notesDeleted);

    if (notes.length === notesDeleted.length) {
        console.log(chalk.red.inverse("No note found!"));
    } else {
        console.log(chalk.green.inverse("Note removed!"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bold.inverse("Your notes:\n"));
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    notes = loadNotes();

    noteFound = notes.find((note) => note.title === title);

    if (noteFound) {
        console.log(chalk.bold.inverse(noteFound.title));
        console.log(noteFound.body);
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync(NOTES_PATH, notesJSON);
}

const loadNotes = () => {
    try {
        const notesJSON = fs.readFileSync(NOTES_PATH, {
            encoding: 'utf-8'
        });
        const notes = JSON.parse(notesJSON);

        return notes;
    } catch (e) {
        return [];
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};