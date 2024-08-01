import {body, query, param} from "express-validator"

export const userRegistrationValidation = [
    body('email').not().isEmpty().withMessage("email is required").trim(),
    body('email').isEmail().withMessage('Invalid email format').trim(),
    body('email').isLength({max:30}).withMessage('email can not be more than 30 characters long').trim(),
    body('password').not().isEmpty().withMessage('password is required').trim(),
    body('password').isLength({min: 6}).withMessage('The minimum password length should be 6 characters').trim(),
  ]

export const emailValidation = [
  body('email').not().isEmpty().withMessage("email is required").trim(),
  body('email').isEmail().withMessage('Invalid email format').trim(),
]

export const resetPasswordValidation = [
  body('newPassword').not().isEmpty().withMessage('newPassword is required to reset the password').trim(),
  body('newPassword').isLength({min: 6}).withMessage('The minimum password length should be 6 characters').trim(),
  body('confirmPassword').not().isEmpty().withMessage('confirmPassword is required to reset the password').trim(),
  body('confirmPassword').isLength({min: 6}).withMessage('The minimum password length should be 6 characters').trim(),
]

export const createRestaurantValidation = [
  body('name').not().isEmpty().withMessage('Name of restaurant is required.').trim(),
  body('name').isAlphanumeric().withMessage('invalid restaurant name').trim(),
  body('name').isLength({max:30}).withMessage('name can not be more than 30 characters long').trim(),
  body('address').not().isEmpty().withMessage('Address of restaurant is required.').trim(),
  body('address').isAlphanumeric().withMessage('invalid restaurant Address.').trim(),
  body('cuisine_type').not().isEmpty().withMessage('cuisine_type is required.').trim(),
  body('cuisine_type').isAlpha().withMessage('Invalid cuisine_type').trim(),
  body('longitude').not().isEmpty().withMessage('longitude is required.').trim(),
  body('longitude').isFloat().withMessage('Invalid Longitude').trim(),
  body('latitude').not().isEmpty().withMessage('latitude is required.').trim(),
  body('latitude').isFloat().withMessage('Invalid latitude').trim(),
]

export const deleteRestaurantValidation = [
  param('id').not().isEmpty().withMessage('id is required to delete the restaurant'),
  param('id').isNumeric().withMessage('Invalid id please provide a valid id'),
]

export const getRestaurantValidation = [
  body('longitude').not().isEmpty().withMessage('longitude is required').trim(),
  body('longitude').isFloat().withMessage('Invalid longitude').trim(),
  body('latitude').not().isEmpty().withMessage('latitude is required').trim(),
  body('latitude').isFloat().withMessage('Invalid latitude').trim(),
  body('radius').not().isEmpty().withMessage('Radius is required').trim(),
  body('radius').isFloat().withMessage('Invalid radius').trim(),
]
