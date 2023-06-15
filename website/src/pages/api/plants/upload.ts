import {db, sql} from '@vercel/postgres';
import {NextApiRequest, NextApiResponse} from 'next';
import {mysql_db, PostgresSQL, SQLDatabase} from "@/modules/databse";
import mysql from 'serverless-mysql';
import{USE_POSTGRES} from "@/modules/constants";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {

    //return response.status(200).json({ error: 'This part of the API is unavailable until authentication is finished' });

    // If the request is not a POST request, return an error
    if(request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed, please use POST' });
    }

    // Select what database is being used
    const dataBase = USE_POSTGRES ? db : mysql_db

    // Connect to it
    let client : any = await dataBase.connect();

    // MySQL requires to get client from connection
    if(!USE_POSTGRES){
        client = dataBase.getClient()
    }

    // Try uploading the data to the database
    try {
        let {
            edit_id,
            preferred_name,
            english_name,
            maori_name,
            latin_name,
            location_found,
            small_description,
            long_description,
            months_ready_events,
            months_ready_start_months,
            months_ready_end_months,
            edible_parts,
            edible_images,
            edible_nutrition,
            edible_preparation,
            edible_preparation_type,
            medical_types,
            medical_uses,
            medical_images,
            medical_preparation,
            craft_parts,
            craft_uses,
            craft_images,
            craft_additional_info,
            source_types,
            source_data,
            custom_titles,
            custom_text,
            attachment_paths,
            attachment_types,
            attachment_names,
            attachment_downloadable

        } = request.body;

        console.log("API/Upload")
        console.log(request.body);

        // Return what parameters are missing
        const missingParametersErrorCode = 200;
        if(preferred_name === null)             { return response.status(missingParametersErrorCode).json({ error: 'Preferred name parameter not found' }); }
        if(english_name === null)               { return response.status(missingParametersErrorCode).json({ error: 'English name parameter not found' }); }
        if(maori_name === null)                 { return response.status(missingParametersErrorCode).json({ error: 'Maori name parameter not found' }); }
        if(latin_name === null)                 { return response.status(missingParametersErrorCode).json({ error: 'Latin name parameter not found' }); }
        if(location_found === null)             { return response.status(missingParametersErrorCode).json({ error: 'location_found parameter not found' }); }
        if(small_description === null)          { return response.status(missingParametersErrorCode).json({ error: 'Small description parameter not found' }); }
        if(long_description === null)           { return response.status(missingParametersErrorCode).json({ error: 'Long description parameter not found' }); }
        if(months_ready_events === null)        { return response.status(missingParametersErrorCode).json({ error: 'Months ready events parameter not found' }); }
        if(months_ready_start_months === null)  { return response.status(missingParametersErrorCode).json({ error: 'Months ready start months parameter not found' }); }
        if(months_ready_end_months === null)    { return response.status(missingParametersErrorCode).json({ error: 'Months ready end months parameter not found' }); }
        if(edible_parts === null)               { return response.status(missingParametersErrorCode).json({ error: 'Edible parts parameter not found' }); }
        if(edible_images === null)              { return response.status(missingParametersErrorCode).json({ error: 'Edible images parameter not found' }); }
        if(edible_nutrition === null)           { return response.status(missingParametersErrorCode).json({ error: 'Edible nutrition parameter not found' }); }
        if(edible_preparation === null)         { return response.status(missingParametersErrorCode).json({ error: 'Edible preparation parameter not found' }); }
        if(edible_preparation_type === null)    { return response.status(missingParametersErrorCode).json({ error: 'Edible preparation type parameter not found' }); }
        if(medical_types === null)              { return response.status(missingParametersErrorCode).json({ error: 'Medical types parameter not found' }); }
        if(medical_uses === null)               { return response.status(missingParametersErrorCode).json({ error: 'Medical uses parameter not found' }); }
        if(medical_images === null)             { return response.status(missingParametersErrorCode).json({ error: 'Medical images parameter not found' }); }
        if(medical_preparation === null)        { return response.status(missingParametersErrorCode).json({ error: 'Medical preparation parameter not found' }); }
        if(craft_parts === null)                { return response.status(missingParametersErrorCode).json({ error: 'Craft parts parameter not found' }); }
        if(craft_uses === null)                 { return response.status(missingParametersErrorCode).json({ error: 'Craft uses parameter not found' }); }
        if(craft_images === null)               { return response.status(missingParametersErrorCode).json({ error: 'Craft images parameter not found' }); }
        if(craft_additional_info === null)      { return response.status(missingParametersErrorCode).json({ error: 'Craft additional info parameter not found' }); }
        if(source_types === null)               { return response.status(missingParametersErrorCode).json({ error: 'Source types parameter not found' }); }
        if(source_data === null)                { return response.status(missingParametersErrorCode).json({ error: 'Source data parameter not found' }); }
        if(custom_titles === null)              { return response.status(missingParametersErrorCode).json({ error: 'Custom titles parameter not found' }); }
        if(custom_text === null)                { return response.status(missingParametersErrorCode).json({ error: 'Custom text parameter not found' }); }
        if(attachment_paths === null)           { return response.status(missingParametersErrorCode).json({ error: 'Attachment paths parameter not found' }); }
        if(attachment_types === null)           { return response.status(missingParametersErrorCode).json({ error: 'Attachment types parameter not found' }); }
        if(attachment_names === null)           { return response.status(missingParametersErrorCode).json({ error: 'Attachment names parameter not found' }); }
        if(attachment_downloadable === null)    { return response.status(missingParametersErrorCode).json({ error: 'Attachment downloadable parameter not found' }); }

        // Check if the data is being downloaded from the Postgres database
        let tables = new SQLDatabase();

        // Set the tables to use
        if(USE_POSTGRES) {
            tables = new PostgresSQL();
        }

        let insertQuery = "";
        let insetQueryValues = "";
        let getIDQuery = "(SELECT id FROM new_plant)";

        if(edit_id){
            insertQuery += `${tables.id}, `;
            insetQueryValues += `${edit_id}, `;
            getIDQuery = `${edit_id}`;
        }

        // Create the query
        let query = ``;

        // Add the information for the plant data
        query += `INSERT INTO plants (${insertQuery} ${tables.preferred_name}, ${tables.english_name}, ${tables.maori_name}, ${tables.latin_name}, ${tables.location_found}, ${tables.small_description}, ${tables.long_description}) `;
        query += `VALUES (${insetQueryValues} '${preferred_name}', '${english_name}', '${maori_name}', '${latin_name}', '${location_found}', '${small_description}', '${long_description}') RETURNING id;`;

        // Create a temporary table to hold the new plant id
        query += `DROP TABLE IF EXISTS new_plant; CREATE TEMPORARY TABLE new_plant AS (
          SELECT id
          FROM plants
          ORDER BY id DESC
          LIMIT 1
        );`;

        // If there is months ready data, add it to the query
        if(months_ready_events.length > 0) {
            // Tell the query that we are adding to the months ready for use table
            query += `INSERT INTO months_ready_for_use (plant_id, ${tables.months_event}, ${tables.months_start_month}, ${tables.months_end_month}) VALUES `;

            // Loop through each of the months ready events
            for(let i = 0; i < months_ready_events.length; i++) {
                // Add the data to the query
                query += `(${getIDQuery}, '${months_ready_events[i]}', '${months_ready_start_months[i]}', '${months_ready_end_months[i]}')`;

                // If this is not the last item, add a comma otherwise add a semicolon
                if(i < months_ready_events.length - 1) {
                    query += `, `;
                }else{
                    query += `;`;
                }
            }
        }

        // If there is edible sections data, add it to the query
        if(edible_parts.length > 0) {

            // Tell the query that we are adding to the edible parts table
            query += `INSERT INTO edible (plant_id, ${tables.edible_part_of_plant}, ${tables.edible_image_of_part}, ${tables.edible_nutrition}, ${tables.edible_preparation}, ${tables.edible_preparation_type}) VALUES `;

            // Loop through each of the edible parts
            for(let i = 0; i < edible_parts.length; i++) {
                // Add the data to the query
                query += `(${getIDQuery}, '${edible_parts[i]}', '${edible_images[i]}', '${edible_nutrition[i]}', '${edible_preparation[i]}', '${edible_preparation_type[i]}')`;

                // If this is not the last item, add a comma otherwise add a semicolon
                if(i < edible_parts.length - 1) {
                    query += `, `;
                }else{
                    query += `;`;
                }
            }
        }

        // If there is medical sections data, add it to the query
        if(medical_types.length > 0) {

            // Tell the query that we are adding to the medical types table
            query += `INSERT INTO medical (plant_id, ${tables.medical_type}, ${tables.medical_use}, ${tables.medical_image}, ${tables.medical_preparation}) VALUES `;

            // Loop through each of the medical types
            for(let i = 0; i < medical_types.length; i++) {
                // Add the data to the query
                query += `(${getIDQuery}, '${medical_types[i]}', '${medical_uses[i]}', '${medical_images[i]}', '${medical_preparation[i]}')`;

                // If this is not the last item, add a comma otherwise add a semicolon
                if(i < medical_types.length - 1) {
                    query += `, `;
                }else{
                    query += `;`;
                }
            }
        }

        // If there is craft section data, add it to the query
        if(craft_parts.length > 0) {

            // Tell the query that we are adding to the craft parts table
            query += `INSERT INTO craft (plant_id, ${tables.craft_part_of_plant}, ${tables.craft_use}, ${tables.craft_image}, ${tables.craft_additional_info}) VALUES `;


            // Loop through each of the craft parts
            for(let i = 0; i < craft_parts.length; i++) {
                // Add the data to the query
                query += `(${getIDQuery}, '${craft_parts[i]}', '${craft_uses[i]}', '${craft_images[i]}', '${craft_additional_info[i]}')`;

                // If this is not the last item, add a comma otherwise add a semicolon
                if(i < craft_parts.length - 1) {
                    query += `, `;
                }else{
                    query += `;`;
                }
            }
        }

        // If there is source section, add it to the query
        if(source_types.length > 0) {
            // Tell the query that we are adding to the source types table

            query += `INSERT INTO source (plant_id, ${tables.source_type}, ${tables.source_data}) VALUES `;

            // Loop through each of the source types
            for(let i = 0; i < source_types.length; i++) {
                // Add the data to the query
                query += `(${getIDQuery}, '${source_types[i]}', '${source_data[i]}')`;

                // If this is not the last item, add a comma otherwise add a semicolon
                if(i < source_types.length - 1) {
                    query += `, `;
                }else{
                    query += `;`;
                }
            }
        }

        // If there is custom section, add it to the query
        if(custom_titles.length > 0) {
            // Tell the query that we are adding to the custom table
            query += `INSERT INTO custom (plant_id, ${tables.custom_title}, ${tables.custom_text}) VALUES `;

            // Loop through each of the custom titles
            for(let i = 0; i < custom_titles.length; i++) {
                // Add the data to the query
                query += `(${getIDQuery}, '${custom_titles[i]}', '${custom_text[i]}')`;

                // If this is not the last item, add a comma otherwise add a semicolon
                if(i < custom_titles.length - 1) {
                    query += `, `;
                }else{
                    query += `;`;
                }
            }
        }

        // If there are attachments, add them to the query
        if(attachment_paths.length > 0) {

            // Tell the query that we are adding to the attachments table
            query += `INSERT INTO attachments (plant_id, ${tables.attachment_path}, ${tables.attachment_type}, ${tables.attachment_name}, ${tables.attachment_downloadable}) VALUES `;

            // Loop through each of the attachments
            for(let i = 0; i < attachment_paths.length; i++) {

                // Add the data to the query
                query += `(${getIDQuery}, '${attachment_paths[i]}', '${attachment_types[i]}', '${attachment_names[i]}', ${attachment_downloadable[i]})`;

                // If this is not the last item, add a comma otherwise add a semicolon
                if(i < attachment_paths.length - 1) {
                    query += `, `;
                } else {
                    query += `;`;
                }

            }
            
        }

        // Log the query
        console.log("=====================================")
        console.log(query);
        console.log("=====================================")

        let data;


        if(!USE_POSTGRES){
            query = client.escape(query)
        }

        // Get the data from the database
        data  = await client.query(query);

        console.log(data)

        // Get the id of the new plant
        // @ts-ignore (has to be like this data[0] is an object)
        const id = data[0].rows[0].id;

        // If there is no id, return an error
        if(!id) {
            return response.status(500).json({ error: "Error creating plant (id not returned)" });
        }


        return response.status(200).json({ message: "Upload Successful", id: id });
    } catch (error) {
        // If there is an error, return the error
        console.log("ERROR")
        console.log(error)
        return response.status(500).json({message: "ERROR IN SERVER", error: error });
    } finally {

        await client.end();

    }
}