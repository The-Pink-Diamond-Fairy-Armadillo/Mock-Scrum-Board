const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

//CATEGORY CONTROLLERS
router.post('/createcategory', categoryController.addCategory, (req, res) => {
  console.log('finished creating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.post('/removecategory', categoryController.removeCategory, (req, res) => {
  console.log('finished removing category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.put('/editcategory', categoryController.editCategory, (req, res) => {
  console.log('finished updating category', res.locals.category);
  res.status(200).json(res.locals.category);
});


// USER CONTROLLERS 

router.post('/createuser', userController.addUser, (req, res) => {
  res.status(200).json(res.locals.category);
});


router.post('/removeuser/:name', userController.removeUser, (req, res) => {
    
});



// TASK CONTROLLERS
router.post('/createtask', taskController.addTask, (req, res) => {
  console.log('finished creating task ', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.post('/removetask', taskController.removeTask, (req, res) => {
  console.log('finished removing task', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.put('/edittask', taskController.editTask, (req, res) => {
  console.log('finished updating task', res.locals.task);
  res.status(200).json(res.locals.task);
});






