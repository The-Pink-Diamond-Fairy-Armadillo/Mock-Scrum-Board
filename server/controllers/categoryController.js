const Category = require('../models/categoryModel');

const categoryController = {};

categoryController.getCategory = async (req, res, next) => {
  try{
    const categories = await Category.find({});
    res.locals.category = categories;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred in creating category: ' + err,
      message: { err: 'error occurred in creating category: ' + err },
    });
  }
  
};

categoryController.addCategory = async (req, res, next) => {
  const { addCat } = req.body;

  try {
    const existingCategory = await Category.findOne({ category: addCat });
    if (existingCategory) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const newCategory = await Category.create({ category: addCat });
    res.locals.category = newCategory;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred in creating category: ' + err,
      message: { err: 'error occurred in creating category: ' + err },
    });
  }
};

categoryController.removeCategory = async (req, res, next) => {
  const {removeCat} = req.body;

  try {
    const deleted = await Category.findOneAndDelete({category: removeCat});
    if (deleted === null) {
      res.locals.category = 'Nothing was Deleted, could not find category to delete';
      return next();
    } else{
      res.locals.category = deleted;
      return next();
    }
  } catch (err) {
    return next({
      log: 'error occured in delete',
      message: {err: 'error occured in delete: ' + err}  
    });
  }


};

categoryController.editCategory = async (req, res, next) => {
  const {oldCat, newCat} = req.body;

  try {
    const update = await Category.findOneAndUpdate({category: oldCat}, {category: newCat}, {new:true});
    console.log('updated Category: ', update);
    res.locals.category = update;
    return next();
  } catch (err) {
    return next({
      log: 'error occured in update',
      message: {err: 'error occured in update: ' + err}  
    });
  }
};

module.exports = categoryController;
