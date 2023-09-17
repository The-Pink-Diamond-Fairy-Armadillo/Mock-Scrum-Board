import React from 'react';

export default function TaskModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Create New Task</h2>
        <form onSubmit={onSubmit}>
          <input name='Task_Name' placeholder='Task Name' required />
          <input name='Assignee' placeholder='Assignee (comma-separated)' />
          <input name='Due_Date' type='date' placeholder='Due Date' />
          <input name='Priority' placeholder='Priority' />
          <input name='Status' placeholder='Status' />
          <textarea name='Description' placeholder='Description'></textarea>
          <input name='Category' placeholder='Category' />
          <button type='submit'>Create Task</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}