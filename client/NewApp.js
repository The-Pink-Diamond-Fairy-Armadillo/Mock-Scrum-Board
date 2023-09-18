import React, { useState, useRef, useEffect } from 'react';
import NewCategory from './components/NewCategory.js';
import NewTask from './components/NewTask.js';

export default function NewApp() {
  // State for Categories and Tasks
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

 
  // Counter to assign unique IDs
  const categoryIdCounter = useRef(1);
  const taskIdCounter = useRef(1);

  // Function to add a new Category
  const addCategory = () => {
    const newCategory = {
      id: categoryIdCounter.current,
      title: `Category ${categoryIdCounter.current}`,
      taskList: [],
      index: categoryIdCounter.current,
    };
    console.log("ID", newCategory.id);
    categoryIdCounter.current++;
    setCategories([...categories, newCategory]);
  };


  // Function to add a new Task
  const addTask = () => {
     const newTask = {
      id: taskIdCounter.current,
      content: `Task ${taskIdCounter.current}`,
      index: taskIdCounter.current,
      categoryId: null, 
    };
    taskIdCounter.current++;
    setTasks([...tasks, newTask]);
  };


  /*
    Task Drag Handlers
  */

  const handleOnDrag = (taskId) => {
    setDraggedTaskId(taskId);
    console.log("taskId handle Drag", taskId)
  };

  const handleOnDragOver = (e) => {
    console.log("DRAGOVER EVENT FIRED");
    e.preventDefault();
  }

  const handleOnDrop = (e, categoryId) => {
    console.log("DROP EVENT FIRED")
    console.log("EVENT", e);
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    console.log("TASKID", taskId);
    console.log(categoryId, "CATEGORYID")
    // Find the target category by categoryId
    const targetCategory = categories.find((category) => category.id === categoryId);
    // Find the dropped task by taskId
    const droppedTask = tasks.find((task) => task.id.toString() === taskId);
    
    // Update the target category's taskList
    if (targetCategory && droppedTask) {
      // Clone the task to avoid modifying the original one
      const updatedTask = { ...droppedTask };
      // Add the cloned task to the target category's taskList
      targetCategory.taskList.push(updatedTask);

      console.log("category task list,",targetCategory.taskList);

      // Remove the dropped task from the global tasks list
      const updatedTasks = tasks.filter((task) => task.id !== updatedTask.id);
      // Update both the categories and tasks state
      setCategories([...categories]);
      setTasks(updatedTasks);
    }
  };
 
  return (
    <div>
      <h2>Categories</h2>
      <button onClick={addCategory}>Add Category</button>
      <div className="categories-container">
        {categories.map((category) => (
          <NewCategory 
            key={category.id} 
            category={category} 
            tasks= {tasks}
            onDrop={(e) => handleOnDrop(e, category.id)} 
            onDragOver={handleOnDragOver}
            dragStart={handleOnDrag}/>
        ))}
      </div>
      <div>
        <h2>Tasks</h2>
        <button onClick={addTask}>Add Task</button>
        {tasks.map((task) => (
          <NewTask 
            key={task.id} 
            task={task}
            onDragStart={handleOnDrag}
            />
        ))}
      </div>
    </div>
  );
}
