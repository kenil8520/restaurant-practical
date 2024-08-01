import Restaurant from '../models/restaurant.model';
import {Op} from 'sequelize'

export const createRestaurantService = async (name: string, address: string, cuisine_type: string, longitude:number, latitude: number) => {

    const restaurant = await Restaurant.create({
        name: name,
        address: address,
        cuisine_type: cuisine_type,
        longitude: longitude,
        latitude: latitude
    });
    return restaurant
}

export const getNearbyRestaurantService = async (longitude: number, latitude: number, radius: number) => {
    const nearbyRestaurants = await Restaurant.findAll({
        where: {
            longitude: {
                [Op.between]: [longitude - radius, longitude + radius]
            },
            latitude: {
                [Op.between]: [latitude - radius, latitude + radius]
            }
        }
    });

    return nearbyRestaurants;
}



export const getAllRestaurantService = async () => {
    const restaurant = await Restaurant.findAll();
    return restaurant
}

export const getRestaurantById = async (id: number) => {
    const restaurant = await Restaurant.findByPk(id);
    return restaurant
}

export const deleteRestaurantService = async (id: number) => {
    const restaurant = await Restaurant.destroy({where:{id:id}});
    return restaurant
}

