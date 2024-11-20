
import React, { useState } from 'react';
import moment from 'moment'; // For date formatting

function Task({ task, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');

  // Edit function
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save edited task
  const handleSave = () => {
    editTask(task._id, { description: editedDescription, dueDate: editedDueDate });
    setIsEditing(false);
  };

  // Function to cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setEditedDescription(task.description);
    setEditedDueDate(task.dueDate || '');
  };

  return (
    <li>
      {isEditing ? (
        <>
          {/* Description input */}
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          {/* Due date input */}
          <input
            type="date"
            value={editedDueDate ? editedDueDate.slice(0, 10) : ''}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          {/* Save and Cancel buttons */}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          {/* Display task description and due date */}
          <div>
            <strong>{task.description}</strong><br />
            {task.dueDate && (
              <small>Due: {moment(task.dueDate).format('YYYY-MM-DD')}</small>
            )}
          </div>
          {/* Edit and Delete buttons */}
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={deleteTask}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default Task;
