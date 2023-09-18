import React from 'react';
import NewTask from "./NewTask"
export default function NewCategory({ category, tasks, dragStart, onDrop, onDragOver }) {
  // const categoryTasks = tasks.filter((task) => task.categoryId === category.id);

  return (
    <div className="category" 
      onDragOver={onDragOver}
      onDrop={onDrop}>
      <h3>{category.title}</h3>
      {category.taskList.map((task) => (
          <NewTask 
            key={task.id} 
            task={task}
            onDragStart={dragStart}
          />
        ))}
    </div>
  );
}
