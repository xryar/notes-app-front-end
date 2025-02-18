import '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
    const noteListContainer = document.querySelector('#noteListContainer');
    const noteListElement = noteListContainer.querySelector('note-list');

    const showAllNotes = () => {
        const notes = Notes.getAllNotes();
        noteListElement.innerHTML = '';
        notes.forEach(note => {
            const noteItemElement = document.createElement('note-item');
            noteItemElement.note = note;
            noteListElement.appendChild(noteItemElement);
        }) 
    }

    showAllNotes();
}

export default home;