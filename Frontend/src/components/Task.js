// src/components/Task.js

import React, { useState } from 'react';

function Task({ task, toggleCompletion, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(task.description);

  // Save the edited task
  const saveEdit = () => {
    editTask(task._id, { description: editDescription });
    setIsEditing(false);
  };

  return (
    <tr>
      {/* Task description or edit input */}
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        ) : (
          <span className={task.completed ? 'completed-task' : ''}>
            {task.description}
          </span>
        )}
      </td>

      {/* Checkbox to toggle completion */}
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompletion(task._id, !task.completed)}
        />
      </td>

      {/* Due date display */}
      <td>
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
      </td>

      {/* Action buttons */}
      <td>
        {isEditing ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
}

export default Task;
