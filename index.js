const notesSection = document.getElementById('notesSection');
const addNoteButton = document.getElementById('addNote');
const saveAllButton = document.getElementById('saveAll');


window.onload = loadSavedNotes;


addNoteButton.addEventListener('click', function() {
    createNote();
});

saveAllButton.addEventListener('click', saveAllNotes);

function createNote(noteData = { note: '', tasks: [] }) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('note-buttons');

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.classList.add('add-task');

    const deleteNoteButton = document.createElement('button');
    deleteNoteButton.textContent = 'Delete Note';
    deleteNoteButton.onclick = function () {
        noteDiv.remove(); 
        saveToLocalStorage(); 
    };

    buttonsDiv.appendChild(addTaskButton);
    buttonsDiv.appendChild(deleteNoteButton);
    noteDiv.appendChild(buttonsDiv);

    const textArea = document.createElement('textarea');
    textArea.placeholder = "Write your task here...";
    textArea.value = noteData.note;
    noteDiv.appendChild(textArea);

    noteData.tasks.forEach(taskText => {
        addTask(taskText, noteDiv);
    });

    addTaskButton.onclick = function () {
        addTask(textArea.value, noteDiv);
        textArea.value = ''; 
        saveToLocalStorage(); 
    };

    notesSection.appendChild(noteDiv);
}

function addTask(taskText, noteDiv) {
    if (taskText === '') return; 
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.textContent = 'Delete';
    deleteTaskButton.classList.add('delete-task');
    deleteTaskButton.onclick = function () {
        taskDiv.remove(); 
        saveToLocalStorage(); 
    };

    taskDiv.appendChild(taskContent);
    taskDiv.appendChild(deleteTaskButton);
    noteDiv.appendChild(taskDiv);
}

function saveAllNotes() {
    const noteDivs = document.querySelectorAll('.note');

    noteDivs.forEach(noteDiv => {
        const textArea = noteDiv.querySelector('textarea');
        const addTaskButton = noteDiv.querySelector('.add-task');

        
        textArea.disabled = true;
        addTaskButton.disabled = true;
    });

    saveToLocalStorage(); 
    alert("All your notes have been saved and are now non-editable.");
}

function saveToLocalStorage() {
    const notes = [];
    const noteDivs = document.querySelectorAll('.note');

    noteDivs.forEach(noteDiv => {
        const textArea = noteDiv.querySelector('textarea');
        const tasks = Array.from(noteDiv.querySelectorAll('.task')).map(taskDiv => {
            return taskDiv.firstChild.textContent;
        });

        notes.push({ note: textArea.value, tasks });
    });

    localStorage.setItem('savedNotes', JSON.stringify(notes)); 
}

function loadSavedNotes() {
    const savedNotes = localStorage.getItem('savedNotes');

    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        notes.forEach(noteData => {
            createNote(noteData); 
        });
    }
}