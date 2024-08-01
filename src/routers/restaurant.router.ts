import express from 'express'
import {createRestaurant, getAllRestaurants, deleteRestaurant, getNearbyRestaurants} from '../controllers/restaurant.controller'
import {createRestaurantValidation, deleteRestaurantValidation, getRestaurantValidation } from '../middleware/validator.middleware'
import { validateError } from '../middleware/error.middleware'


const router = express.Router();

router.post('/create-restaurant', createRestaurantValidation, validateError, createRestaurant);

router.get('/get-all-restaurants', getAllRestaurants);

router.get('/get-nearby-restaurants', getRestaurantValidation, validateError, getNearbyRestaurants);

router.delete('/delete-restaurant/:id', deleteRestaurantValidation, validateError, deleteRestaurant);

export default router;

