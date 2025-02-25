import "../utils.js";
import NotesApi from "../data/remote/notes-api.js";

const home = async () => {
  const noteListContainer = document.querySelector("#noteListContainer");
  console.log(noteListContainer);
  const noteListElement = noteListContainer.querySelector("note-list");
  console.log(noteListElement);
  const formInputElement = document.querySelector("form-input");
  console.log(formInputElement);
  const loadingIndicator = document.querySelector("#loading");

  const showAllNotes = async () => {
    try {
      loadingIndicator.classList.remove("hidden");
      noteListElement.innerHTML = "";

      const notes = await NotesApi.getAllNotes();

      loadingIndicator.classList.add("hidden");

      notes.forEach((note) => {
        const noteItemElement = document.createElement("note-item");
        noteItemElement.note = note;
        noteListElement.appendChild(noteItemElement);
      });
    } catch (error) {
      console.error("Gagal Mengambil Catatan cik: ", error);
      loadingIndicator.classList.add("hidden");
    }
  };

  const addNewNote = async (event) => {
    const newNote = event.detail;
    try {
      const addedNote = await NotesApi.addNote(newNote);
      if (addedNote) {
        await showAllNotes();
      }
      console.log("Berhasil Menambah Catatan: ", addedNote);
    } catch (error) {
      console.error("Gagal Menambah Catatan: ", error);
    }
  };

  const deleteNote = async (event) => {
    const noteId = event.detail;
    try {
      await NotesApi.deleteNote(noteId);
      await showAllNotes();
      console.log("Berhasil Menghapus Catatan: ", noteId);
    } catch (error) {
      console.error("Gagal Menghapus Catatan: ", error);
    }
  };

  formInputElement.addEventListener("note-submitted", addNewNote);
  noteListContainer.addEventListener("note-deleted", deleteNote);
  await showAllNotes();
};

export default home;
