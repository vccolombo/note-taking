const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes...';
}

const addNote = function (title, body) {
    const notes = loadNotes("notes.json");
    // Save to file only if title is unique
    if (notes.some(note => note.title === title) == false) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);

        console.log('New note added!');
    }
}

const removeNote = function (title) {
    const notes = loadNotes("notes.json");

    const notesDeleted = notes.filter((note) => {
        return note.title !== title;
    });

    saveNotes(notesDeleted);

    if (notes.length === notesDeleted.length) {
        console.log(chalk.red.inverse("No note found!"));
    } else {
        console.log(chalk.green.inverse("Note removed!"));
    }
}

const saveNotes = function (notes) {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

const loadNotes = function (filePath) {
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