import React, { useState } from 'react';
import './EditTask.css';

const EditTask = ({ task, updateTask }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(editedTask);
  };

  return (
    <div className='edit-task'>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          name='status'
          placeholder='Edit Status'
          onChange={handleChange}
          value={editedTask.status}
        />
        <input
          type='text'
          name='name'
          placeholder='Edit Task Name'
          onChange={handleChange}
          value={editedTask.name}
        />
        <input
          type='text'
          name='description'
          placeholder='Edit Task Description'
          onChange={handleChange}
          value={editedTask.description}
        />
        <button className='button'>Save Changes</button>
      </form>
    </div>
  );
};

export default EditTask;