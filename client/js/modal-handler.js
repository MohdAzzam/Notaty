function openAddModal() {
  var modal = document.getElementById("addNoteModal");
  modal.style.display = "block";
  var x = document.getElementById("closeAdd");
  var cancel = document.getElementById("cancelAddNoteBtn");
  clearAddModal();
  cancel.onclick = () => {
    modal.style.display = "none";
  };
  x.onclick = () => {
    modal.style.display = "none";
  };
}
function clearAddModal() {
  document.getElementById("addTitle").value = "";
  document.getElementById("addContent").value = "";
  document.getElementById("addError").innerHTML = "";
}
function saveNewNote() {

  const titleStr = document.getElementById("addTitle").value;
  const contentStr = document.getElementById("addContent").value;
  const noteData = {
    title: titleStr,
    content: contentStr,
  };
  addNote(noteData)
    .then((response) => {
      if (response.ok) {
        let modal = document.getElementById("addNoteModal");
        modal.style.display = "none";
        response.json().then(json=>{
          var newNoteId=json['_id'];
          updateNotesTable(newNoteId);
        })
      } else {
        response.text().then((data) => {
          document.getElementById("addError").innerHTML = data;
        });
      }
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("addError").innerHTML = err;
    });
}

function openEditModal(noteId) {
  var modal = document.getElementById("editNoteModal");
  modal.style.display = "block";
  var x = document.getElementById("cancelEditNoteBtns");
  var cancelbtn = document.getElementById("closeEdit");
  cancelbtn.onclick = () => {
    modal.style.display = "none";
  };
  x.onclick = () => {
    modal.style.display = "none";
  };
  clearAddModal();
  loadNoteData(noteId);
}
function loadNoteData(noteId) {
  var model = document.getElementById("editNoteModal");
  var nodeIdAttribute = document.createAttribute("noteid");
  nodeIdAttribute.value = noteId;
  model.setAttributeNode(nodeIdAttribute);
  getNoteById(noteId).then((data) => {
    document.getElementById("editTitle").value = data["title"];
    document.getElementById("editContent").value = data["content"];
  });
}
function saveEditNote() {
  var model = document.getElementById("editNoteModal");
  const noteId = model.getAttribute("noteid");
  const titleStr = document.getElementById("editTitle").value;
  const contentStr = document.getElementById("editContent").value;

  const noteData = {
    _id: noteId,
    title: titleStr,
    content: contentStr,
  };
  updateNote(noteData)
    .then((response) => {
      if (response.ok) {
        let modal = document.getElementById("editNoteModal");
        modal.style.display = "none";
        updateNotesTable(noteId);
      } else {
        response.text().then((data) => {
          document.getElementById("editError").innerHTML = data;
        });
      }
    })
    .catch((err) => {
      document.getElementById("editError").innerHTML = err;
    });
}
