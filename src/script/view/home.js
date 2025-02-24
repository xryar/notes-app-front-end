import '../utils.js';
import NotesApi from '../data/remote/notes-api.js';

const home = async () => {
    const noteListContainer = document.querySelector('#noteListContainer');
    console.log(noteListContainer);
    const noteListElement = noteListContainer.querySelector('note-list');
    console.log(noteListElement);
    const formInputElement = document.querySelector('form-input');

    const showAllNotes = async () => {
        try {
            noteListElement.innerHTML = '';
            const notes = await NotesApi.getAllNotes();

            notes.forEach(note => {
                const noteItemElement = document.createElement('note-item');
                noteItemElement.note = note;
                noteListElement.appendChild(noteItemElement);
            });
        } catch (error) {
            console.error('Gagal Mengambil Catatan cik: ', error);
        }
    }

    const addNewNote = async (event) => {
        const newNote = event.detail;
        try {
            const addedNote =await NotesApi.addNote(newNote);
            if (addedNote) {
                await showAllNotes();
            }
            console.log('Berhasil Menambah Catatan: ', addedNote);
        } catch (error) {
            console.error('Gagal Menambah Catatan: ', error);
        }
    }

    formInputElement.addEventListener('note-submitted', addNewNote);
    await showAllNotes();
}

export default home;