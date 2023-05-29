// Class for the names of the database tables depending  on SQL or  postgreSQL
export class SQLDatabase {

    // Generic
    id: string;
    plant_id: string;

    // Plants Table
    preferred_name: string;
    english_name: string;
    maori_name: string;
    latin_name: string;
    location_found: string;
    small_description: string;
    long_description: string;

    // Attachments Table
    attachment_path: string;
    attachment_type: string;
    attachment_name: string;
    attachment_downloadable: string;

    // Craft Table
    craft_part_of_plant: string;
    craft_use: string;
    craft_additional_info: string;
    craft_image: string;

    // Custom Table
    custom_title: string;
    custom_text: string;

    // Edible Table
    edible_part_of_plant: string;
    edible_image_of_part: string;
    edible_nutrition: string;
    edible_preparation: string;
    edible_preparation_type: string;

    // Medical Table
    medical_type: string;
    medical_use: string;
    medical_image: string;
    medical_preparation: string;

    // Source Table
    source_type: string;
    source_data: string;

    // Months For Use Table
    months_event: string;
    months_start_month: string;
    months_end_month: string;

    constructor() {
        // Generic
        this.id = "id";
        this.plant_id = "plant_id";

        // Plants Table
        this.preferred_name             = "preferred_name";
        this.english_name               = "english_name";
        this.maori_name                 = "maori_name";
        this.latin_name                 = "latin_name";
        this.location_found                   = "location_found";
        this.small_description          = "small_description";
        this.long_description           = "long_description";

        // Attachments Table
        this.attachment_path            = "attachments_path";
        this.attachment_type            = "attachments_type";
        this.attachment_name            = "attachments_name";
        this.attachment_downloadable    = "attachments_downloadable";

        // Craft Table
        this.craft_part_of_plant        = "craft_part_of_plant";
        this.craft_use                  = "craft_use";
        this.craft_additional_info      = "craft_additional_info";
        this.craft_image                = "craft_image";

        // Custom Table
        this.custom_title               = "custom_title";
        this.custom_text                = "custom_text";

        // Edible Table
        this.edible_part_of_plant       = "edible_part_of_plant";
        this.edible_image_of_part       = "edible_image";
        this.edible_nutrition           = "edible_nutrition";
        this.edible_preparation         = "edible_preparation";
        this.edible_preparation_type    = "edible_preparation_type";

        // Medical Table
        this.medical_type               = "medical_type";
        this.medical_use                = "medical_use";
        this.medical_image              = "medical_image";
        this.medical_preparation        = "medical_preparation";

        // Source Table
        this.source_type                = "source_type";
        this.source_data                = "source_data";

        // Months For Use Table
        this.months_event               = "months_event";
        this.months_start_month         = "months_start_month";
        this.months_end_month           = "months_end_month";

    }
}

export class PostgresSQL extends SQLDatabase{

    constructor() {
        super();

        // Generic
        this.id = "id";
        this.plant_id = "plant_id";

        // Plants Table
        // DOESNT  CHANGE

        // Attachments Table
        this.attachment_path            = "path";
        this.attachment_type            = "type";
        this.attachment_name            = "name";
        this.attachment_downloadable    = "downloadable";

        // Craft Table
        this.craft_part_of_plant        = "part_of_plant";
        this.craft_use                  = "use";
        this.craft_additional_info      = "additional_info";
        this.craft_image                = "image";

        // Custom Table
        this.custom_title               = "title";
        this.custom_text                = "text";

        // Edible Table
        this.edible_part_of_plant       = "part_of_plant";
        this.edible_image_of_part       = "image_of_part";
        this.edible_nutrition           = "nutrition";
        this.edible_preparation         = "preparation";
        this.edible_preparation_type    = "preparation_type";

        // Medical Table
        this.medical_type               = "medical_type";
        this.medical_use                = "use";
        this.medical_image              = "image";
        this.medical_preparation        = "preparation";

        // Source Table
        this.source_type                = "source_type";
        this.source_data                = "data";

        // Months For Use Table
        this.months_event               = "event";
        this.months_start_month         = "start_month";
        this.months_end_month           = "end_month";
    }
}