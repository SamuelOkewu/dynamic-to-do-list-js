// Global constants for DOM elements (initialized in DOMContentLoaded)
let taskInput;
let taskList;

// Function to save the current state of tasks to Local Storage
function saveTasksToLocalStorage() {
    // Select all <li> elements within the task list
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        // Get the text content of the <li>, excluding the 'Remove' button's text
        // We look at the node's first child, which should be the text node, or just use textContent and trim
        // A safer method for this structure is to assume the task text is the part before the button.
        const taskText = li.firstChild.textContent.trim();
        tasks.push(taskText);
    });
    
    // Save the array of task texts to Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task to the DOM and optionally save it to Local Storage
// 'taskText' is the content, 'isNewTask' determines if it needs to be saved to LS (true for new user input)
function addTask(taskText, isNewTask = true) {
    // Trim the text, handle empty input only for new tasks from user
    const text = taskText.trim();
    
    if (text === "" && isNewTask) {
        alert("Please enter a task.");
        return; // Exit if empty and from user input
    }
    
    if (text === "") return; // Exit if empty and from storage (shouldn't happen but for safety)

    // --- Task Creation (DOM Manipulation) ---
    
    // Create a new li element
    const listItem = document.createElement('li');
    // Set its text content to the task text
    listItem.textContent = text; // This creates a text node

    // Create a new button element for removing the task
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';

    // Assign an onclick event to the remove button
    removeButton.onclick = function() {
        // Remove the <li> element from the DOM
        taskList.removeChild(listItem);
        
        // Update Local Storage after removal
        saveTasksToLocalStorage(); 
    };

    // Append the remove button to the li element
    listItem.appendChild(removeButton);
    
    // Append the li to taskList
    taskList.appendChild(listItem);

    // --- Local Storage Update ---
    
    if (isNewTask) {
        // If it's a new task from user input, clear the input field
        taskInput.value = "";
        
        // Save the updated list of tasks to Local Storage
        saveTasksToLocalStorage();
    }
}

// Function to load tasks from Local Storage when the page loads
function loadTasks() {
    // Retrieve the tasks from Local Storage, defaulting to an empty array if nothing is found
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    // Iterate over the stored tasks and add each one to the DOM
    storedTasks.forEach(taskText => {
        // Pass 'false' for the second argument to prevent the task from saving itself again
        addTask(taskText, false); 
    });
}

// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    taskInput = document.getElementById('task-input'); // Assign to global variable
    taskList = document.getElementById('task-list');   // Assign to global variable

    // Step 1: Load tasks from Local Storage before setting up listeners
    loadTasks();

    // Event listener for the 'Add Task' button click
    addButton.addEventListener('click', () => {
        // Get the value from the input and call addTask as a new task
        const newTaskText = taskInput.value;
        addTask(newTaskText, true); 
    });

    // Event listener for the 'Enter' keypress in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const newTaskText = taskInput.value;
            addTask(newTaskText, true);
        }
    });

});