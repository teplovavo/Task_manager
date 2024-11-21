import React from 'react';

// Component for rendering a single task
function Task({ task, toggleCompletion, deleteTask }) {
  return (
    <tr>
      {/* Task description with conditional class for completed tasks */}
      <td className={task.completed ? 'completed-task' : ''}>{task.description}</td>

      {/* Checkbox to toggle task completion */}
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompletion(task._id, !task.completed)}
        />
      </td>

      {/* Delete button for the task */}
      <td>
        <button onClick={() => deleteTask(task._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Task;
