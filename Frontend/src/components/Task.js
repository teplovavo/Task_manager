import React, { useState } from 'react';

function Task({ task, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  // edit function
  const handleEdit = () => {
    setIsEditing(true);
  };

  // function to save edited task
  const handleSave = () => {
    editTask(task._id, editedDescription);
    setIsEditing(false);
  };

  // function to cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setEditedDescription(task.description);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          {task.description}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={deleteTask}>Delete</button>
        </>
      )}
    </li>
  );
}

export default Task;
