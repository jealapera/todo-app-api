const { body } = require('express-validator');

exports.registerValidationRules = [
  body('email').isEmail().normalizeEmail().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/)
    .withMessage('Password must contain at least one uppercase letter, one special character, and be alphanumeric'),
];

exports.loginValidationRules = [
  body('email').isEmail().normalizeEmail().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];
