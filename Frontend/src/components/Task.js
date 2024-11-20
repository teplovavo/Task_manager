

import React from 'react';

// deleting task ///////////////
function Task({ task, deleteTask }) {
  return (
    <li>


      {task}
      {/* Button to delete the task */}
      <button onClick={deleteTask}>Delete</button>



    </li>
  );
}

export default Task;
