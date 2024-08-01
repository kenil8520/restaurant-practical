import { Request, Response } from "express";
import {createRestaurantService,
    getAllRestaurantService,
    getRestaurantById,
    deleteRestaurantService,
    getNearbyRestaurantService} from "../services/restaurant.services"


export const createRestaurant = async(req: Request, res: Response) => {
try {
    const {name, address, cuisine_type, longitude, latitude} = req.body;
    const newRestaurant = await createRestaurantService(name, address, cuisine_type, longitude, latitude);
    return res.status(200).json({success: true, message: "Restaurant created successfully", data:newRestaurant})
} catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Internal Server Error"})
}
}


export const getNearbyRestaurants = async (req: Request, res: Response) => {
    try {
        const { longitude, latitude, radius } = req.body as {
            longitude: string,
            latitude: string,
            radius: string
        };
        const nearbyRestaurants = await getNearbyRestaurantService(parseFloat(longitude), parseFloat(latitude), parseFloat(radius));

        if(!nearbyRestaurants){
            return res.status(404).json({ success: true, message: "No restaurant found rearby this radius" });
        }
        return res.status(200).json({ success: true, message: "Nearby Restaurants fetched Successfully", data: nearbyRestaurants });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getAllRestaurants = async(req: Request, res: Response) => {
try {
    const allRestaurant = await getAllRestaurantService();
    return res.status(200).json({success:true, message: "Restaurants fetched Successfully", data: allRestaurant})
} catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Internal Server Error"});
}
}


export const deleteRestaurant = async(req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        const getRestaurant = await getRestaurantById(id)
        if(!getRestaurant){
            return res.status(404).json({success:true, message: "No restaurant found with this id"})
        }
        await deleteRestaurantService(id);
        return res.status(200).json({success:true, message: "Restaurants deleted Successfully"})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

