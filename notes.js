const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    const notes = loadNotes("notes.json");
    // Save to file only if title is unique
    if (title.length === 0) {
        console.log(chalk.red.inverse('Title cannot be empty!'));
    } else if (notes.some((note) => note.title === title) == false) {
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
    const notes = loadNotes("notes.json");

    const notesDeleted = notes.filter((note) => note.title !== title);

    saveNotes(notesDeleted);

    if (notes.length === notesDeleted.length) {
        console.log(chalk.red.inverse("No note found!"));
    } else {
        console.log(chalk.green.inverse("Note removed!"));
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

const loadNotes = (filePath) => {
    try {
        const notesJSON = fs.readFileSync(filePath, {
            encoding: 'utf-8'
        });
        const notes = JSON.parse(notesJSON);

        return notes;
    } catch (e) {
        return [];
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};