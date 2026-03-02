const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteModal = document.getElementById("noteModal");
const viewModal = document.getElementById("viewModal");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveNote = document.getElementById("saveNote");
const cancelNote = document.getElementById("cancelNote");
const searchInput = document.getElementById("searchInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null;

const colors = ["#e0f2fe","#dcfce7","#fef9c3","#ede9fe","#fee2e2"];

function renderNotes(filter="") {
  notesContainer.innerHTML = "";

  notes
    .filter(n =>
      n.title.toLowerCase().includes(filter) ||
      n.content.toLowerCase().includes(filter)
    )
    .forEach((note,index)=>{
      const div=document.createElement("div");
      div.className="note";
      div.style.background=note.color;

      div.innerHTML=`
        <h4>${note.title}</h4>
        <p>${note.content.length>100?note.content.substring(0,100)+"...":note.content}</p>
        <div class="note-actions">
          <button class="view" onclick="viewNote(${index})">View</button>
          <button class="edit" onclick="editNote(${index})">Edit</button>
          <button class="delete" onclick="deleteNote(${index})">Delete</button>
        </div>
      `;

      notesContainer.appendChild(div);
    });

  document.getElementById("noteCount").innerText = notes.length;
}

addNoteBtn.onclick=()=>{
  noteModal.classList.remove("hidden");
  noteTitle.value="";
  noteContent.value="";
  editIndex=null;
  closeSidebar(); 
};

cancelNote.onclick=()=>noteModal.classList.add("hidden");

saveNote.onclick=()=>{
  if(!noteTitle.value.trim()||!noteContent.value.trim()) return alert("Title and Content required");

  const noteData={
    title:noteTitle.value,
    content:noteContent.value,
    color:colors[Math.floor(Math.random()*colors.length)]
  };

  if(editIndex===null) notes.push(noteData);
  else notes[editIndex]=noteData;

  localStorage.setItem("notes",JSON.stringify(notes));
  noteModal.classList.add("hidden");
  renderNotes();
};

function deleteNote(i){
  notes.splice(i,1);
  localStorage.setItem("notes",JSON.stringify(notes));
  renderNotes();
}

function editNote(i){
  noteModal.classList.remove("hidden");
  noteTitle.value=notes[i].title;
  noteContent.value=notes[i].content;
  editIndex=i;
}

function viewNote(i){
  document.getElementById("viewTitle").innerText=notes[i].title;
  document.getElementById("viewContent").innerText=notes[i].content;
  viewModal.classList.remove("hidden");
}

function closeView(){
  viewModal.classList.add("hidden");
}

searchInput.addEventListener("input",()=>renderNotes(searchInput.value.toLowerCase()));

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
  
    sidebar.classList.toggle("active");
    overlay.classList.toggle("hidden");
  }
  
  function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("overlay").classList.add("hidden");
  }

renderNotes();