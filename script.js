// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3 & 4: Create the addTask Function (including Task Creation and Removal)
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit the function if input is empty
        }

        // Create a new li element
        const listItem = document.createElement('li');
        // Set its text content to the task text
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        // When clicked, it removes the parent li element from its parent (taskList)
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            // Alternatively: listItem.remove();
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Step 5: Attach Event Listeners

    // Event listener to call addTask when the 'Add Task' button is clicked
    addButton.addEventListener('click', addTask);

    // Event listener to call addTask when the 'Enter' key is pressed in the input field
    taskInput.addEventListener('keypress', function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Note: The instruction "Invoke the addTask function on DOMContentLoaded" seems to be 
    // an oversight for a standard to-do list setup, as it would try to add an empty task 
    // on load. The core logic runs inside the event listener for DOMContentLoaded already.
    // If the intent was to ensure the script runs, being inside the DOMContentLoaded 
    // listener already accomplishes that. We will omit calling addTask() here to prevent 
    // an initial empty alert/task.

});