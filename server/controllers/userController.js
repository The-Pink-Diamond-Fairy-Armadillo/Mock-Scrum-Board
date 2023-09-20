const User = require('../models/userModel');

const userController = {};

userController.getUser = async (req, res, next) => {
  try{
    const user = await User.find({});
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred in getting task: ' + err,
      message: { err: 'error occurred in getting task: ' + err },
    });
  }
  
};




// add a user
userController.addUser = (req, res, next) => {
  const { name } = req.body;

  User.create({
    name,
  })
    .then((data) => {
      res.locals.newUser = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.addUser: Error ${err}`,
        message: {
          err: 'Error occurred in userController.addUser. Check server logs',
        },
        status: 400,
      });
    });
};

// update a user
userController.updateUser = (req, res, next) => {
  const {name} = req.params;
  const updateUser = req.body;

  User.findOneAndUpdate(
    {name: name},
    {name: updateUser}
  ).exec()
    .then(data => {
      if (!data) {
        return next({
          log: `userController.updateUser: ${name} was not found in the database`,
          message: {
            err: 'Student not found'
          },
          status: 404,
        });
      }
      res.locals.user = data;
      return next()
    })
    .catch(err => {
      return next({
        log: `userController.updateUser: ERROR: ${err}`,
        messages: {
          err: 'Error occurred in userController.updateUser. Check server logs'
        },
        status: 400,
      });
    });
};

// delete a user
userController.removeUser = async (req, res, next) => {
  const { _id } = req.body;
  console.log(_id, 'iD IS THIS');
  try {
    const deleted = await User.findOneAndDelete({_id: _id});
    res.locals.user = deleted;
    return next();
  } catch (err) {
    return next({
      log: 'failed to delete user',
      message: {err: `failed to delete user: ${err}`}
    });
  }
};


module.exports = userController;
