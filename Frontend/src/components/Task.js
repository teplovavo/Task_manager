import React from 'react';

// Component to display a task
function Task({ task, deleteTask }) {
  return (
    <li>
      {task.description}
      {/* Button to delete the task */}
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
}

export default Task;
