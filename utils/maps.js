import { Client } from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({});

// Fetch route from Google Maps API
export const getRoute = async (origin, destination) => {
    try {
        const response = await client.directions({
            params: { origin, destination, key: process.env.GOOGLE_MAPS_API_KEY }
        });
        return response.data.routes[0];
    } catch (err) {
        throw new Error('Error fetching route from Google Maps API');
    }
};