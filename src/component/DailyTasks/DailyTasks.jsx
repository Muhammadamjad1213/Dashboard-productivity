import React, { useState } from "react";

import "../DailyTasks/DailyTasks.css";

/**

 * @param {object} props - The component props.
 * @param {object} props.task - The task object containing title and completed status.
 * @param {number} props.index - The index of the task in the tasks array.
 * @param {function} props.completeTask - Function to mark a task as completed.
 * @param {function} props.removeTask - Function to remove a task.
 */
function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className='task'
      // Apply line-through style if the task is completed
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}
      <div className='actions'>
        {" "}
        {/* Added a div for buttons for better styling control */}
        {/* Button to mark task as complete */}
        {/* Only show "Complete" button if the task is not already completed */}
        {!task.completed && (
          <button
            className='complete-button'
            onClick={() => completeTask(index)}
          >
            Complete
          </button>
        )}
        {/* Button to remove the task */}
        <button
          className='remove-button'
          style={{ background: "red" }}
          onClick={() => removeTask(index)}
        >
          x
        </button>
      </div>
    </div>
  );
}

/**
 * CreateTask component: Renders an input field to add new tasks.
 *
 * @param {object} props - The component props.
 * @param {function} props.addTask - Function to add a new task to the list.
 */
function CreateTask({ addTask }) {
  const [value, setValue] = useState(""); // State to hold the current input value

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (!value) return; // If input is empty, do nothing

    addTask(value); // Call the addTask function passed from parent
    setValue(""); // Clear the input field after adding the task
  };

  return (
    <form onSubmit={handleSubmit} className='create-task-form'>
      <input
        type='text'
        className='input'
        value={value}
        placeholder='Add a new task'
        onChange={(e) => setValue(e.target.value)} // Update state as user types
      />
      <button type='submit' className='add-task-button'>
        Add Task
      </button>{" "}
      {/* Added a submit button */}
    </form>
  );
}

function Todo() {
  // State to hold the array of tasks
  const [tasks, setTasks] = useState([
    {
      title: "Hangout with friends",
      completed: false,
    },
  ]);

  /**
   * Adds a new task to the list.
   * @param {string} title - The title of the new task.
   */
  const addTask = (title) => {
    // Create a new array with existing tasks and the new task
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks); // Update the tasks state
  };

  /**
   * Marks a task as completed.
   * @param {number} index - The index of the task to complete.
   */
  const completeTask = (index) => {
    const newTasks = [...tasks]; // Create a copy of the tasks array
    newTasks[index].completed = true; // Mark the specific task as completed
    setTasks(newTasks); // Update the tasks state
  };

  /**
   * Removes a task from the list.
   * @param {number} index - The index of the task to remove.
   */
  const removeTask = (index) => {
    const newTasks = [...tasks]; // Create a copy of the tasks array
    newTasks.splice(index, 1); // Remove the task at the specified index
    setTasks(newTasks); // Update the tasks state
  };

  return (
    <div className='todo-container'>
      <div className='header'>DAILY-TASKS</div>
      <div className='tasks'>
        {/* Map over the tasks array to render each Task component */}
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask} // Pass the completeTask function as a prop
            removeTask={removeTask} // Pass the removeTask function as a prop
            key={index}
          />
        ))}
      </div>
      <div className='create-task'>
        {/* Render the CreateTask component and pass the addTask function */}
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}

export default Todo;
