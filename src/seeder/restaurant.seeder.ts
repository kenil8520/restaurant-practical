import Database from '../db/index';
import Restaurant from '../models/restaurant.model';

const restaurantsData = [
    { name: "sizzling point", address: "12 demo ", cuisine_type: "Italian", latitude: 123.45, longitude: 67.89 },
    { name: "blue", address: "5 test address", cuisine_type: "Mexican", latitude: 111.22, longitude: 98.76 },
];

const database = new Database();

const seedDatabase = async () => {
    try {
        for (const restaurantData of restaurantsData) {
            const [restaurant, created] = await Restaurant.findOrCreate({
                where: { name: restaurantData.name },
                defaults: restaurantData
            });

            if (!created) {
                await restaurant.update(restaurantData);
            }
        }

        console.log('Restaurants data seeded successfully.');

        await database.sequelize?.close();
        console.log('Connection to the database has been closed.');

    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}

seedDatabase();
