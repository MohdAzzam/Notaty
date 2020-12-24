const baseUrl = "http:://localhost:3000";

async function addNote(noteData) {
  let url = "http://localhost:3000/notes";
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });

  return response.json();
}
async function updateNote(noteData) {
  let url = "http://localhost:3000";
  const response = await fetch(`${url}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  return response.json();
}
async function deleteNote(noteId) {
  let url = "http://localhost:3000/notes";
  const response = await fetch(`${url}/${noteId}`, {
    method: "DELETE",
  });
  return response.json();
}

async function getNoteById(noteId) {
  let url = "http://localhost:3000";
  const response = await fetch(`${url}/notes/${noteId}`);
  return response.json();
}

async function getNotes(noteTitle) {
  let url = "http://localhost:3000/notes";
  if (noteTitle) {
    url += `/?title=${noteTitle}`;
  }
  const response = await fetch(url);
  return response.json();
}
