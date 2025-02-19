import '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
    const noteListContainer = document.querySelector('#noteListContainer');
    console.log(noteListContainer);
    const noteListElement = noteListContainer.querySelector('note-list');
    console.log(noteListElement);
    const formInputElement = document.querySelector('form-input');

    const showAllNotes = () => {
        const notes = Notes.getAllNotes();
        noteListElement.innerHTML = '';
        notes.forEach(note => {
            const noteItemElement = document.createElement('note-item');
            noteItemElement.note = note;
            noteListElement.appendChild(noteItemElement);
        }) 
    }

    const addNewNote = (event) => {
        const newNote = event.detail;

        Notes.addNote(newNote);
        showAllNotes();
    }

    formInputElement.addEventListener('note-submitted', addNewNote);
    showAllNotes();
}

export default home;