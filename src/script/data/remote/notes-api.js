const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
    static async getAllNotes() {
        try {
            const response = await fetch(`${BASE_URL}/notes`);
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson.data;
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    static async addNote(note) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            };

            const response = await fetch(`${BASE_URL}/notes`, options);
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson.data;
        } catch (error) {
            console.error('Error inserting note:', error);
        }
    }

    static async deleteNote(noteId) {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(`${BASE_URL}/notes/${noteId}`, options);
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson.data;
        } catch(error) {
            console.error('Error deleting note:', error);
        }
    }
}

export default NotesApi;