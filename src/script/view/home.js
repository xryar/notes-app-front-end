import "../utils.js";
import Swal from "sweetalert2";
import { animate, stagger } from "motion";
import NotesApi from "../data/remote/notes-api.js";

const home = async () => {
  const noteListContainer = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainer.querySelector("note-list");
  const formInputElement = document.querySelector("form-input");
  const loadingIndicator = document.querySelector("#loading");

  const showAllNotes = async () => {
    try {
      loadingIndicator.classList.remove("hidden");
      noteListElement.innerHTML = "";

      const notes = await NotesApi.getAllNotes();

      loadingIndicator.classList.add("hidden");

      notes.forEach((note, index) => {
        const noteItemElement = document.createElement("note-item");
        noteItemElement.note = note;
        noteListElement.appendChild(noteItemElement);
        animate(
          noteItemElement,
          { opacity: [0, 1], scale: [0.8, 1] },
          { duration: 0.3, delay: index * 0.1 },
        );
      });
    } catch (error) {
      console.error("Error:", error);
      loadingIndicator.classList.add("hidden");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Mengambil Catatan cik, Coba lagi ya!",
      });
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
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Catatan berhasil ditambah!",
      });
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

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Catatan berhasil dihapus!",
      });
    } catch (error) {
      console.error("Gagal Menghapus Catatan: ", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Menghapus Catatan cik, Coba lagi ya!",
      });
    }
  };

  formInputElement.addEventListener("note-submitted", addNewNote);
  noteListContainer.addEventListener("note-deleted", deleteNote);
  await showAllNotes();
};

export default home;
