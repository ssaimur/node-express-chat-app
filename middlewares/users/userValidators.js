// external imports
const path = require('path');
const { unlink } = require('fs');
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../../models/People');

// add user
const addUserValidators = [
  check('name')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain other than alphabets')
    .trim(),

  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError('Email is already in use');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check('mobile')
    .isMobilePhone('bn-BD', { strictMode: true })
    .withMessage('Mobile number must be a valid bangladeshi mobile number')
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError('Mobile phone already in use');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol'
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove the previousl uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    // send the response with errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

// export
module.exports = { addUserValidators, addUserValidationHandler };
