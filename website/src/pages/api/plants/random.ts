import {db} from '@vercel/postgres';
import {NextApiRequest, NextApiResponse} from 'next';
import {getClient, makeQuery} from "@/lib/databse";
import {USE_POSTGRES} from "@/lib/constants";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {

    // If the request is not a GET request, return an error
    if(request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed, please use GET' });
    }

    // Get the client
    const client = await getClient()

    // Get the ID and table from the query string
    const { amount } = request.query;

    // Check if the amount param exists
    if (!amount) {
        // If it doesn't exist, return an error
        return response.status(400).json({ error: 'No amount param found' });
    }

    // Try querying the database
    try {



        // Get x random plant ids from the database
        const plantIds = await makeQuery(`SELECT id FROM plants ORDER BY ${USE_POSTGRES ? "RANDOM" : "RAND"}() LIMIT ${amount}`, client);

        // If there are no plants, return an error
        if (!plantIds) {
            return response.status(404).json({ error: 'No plants found' });
        }

        // Return the plant ids
        return response.status(200).json({ data: plantIds });

    } catch (error) {
        // If there is an error, return the error
        return response.status(500).json({ error:  (error as Error).message });
    }

}