import React from 'react';

export default function Task({ task, onDragStart}) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id.toString());
    console.log("drag start task id:", task.id)
  };

  
  return (
    <div className="task" 
    key={task.id}
    draggable="true"
    onDragStart={handleDragStart}> 
      <p>{task.content}</p>
    </div>
  );
}

// const handleDragStart = (e) => {
//   e.dataTransfer.setData('application/json', JSON.stringify(task));
//   onDragStart(task.id);
// };