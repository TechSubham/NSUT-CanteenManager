const pool = require('./db');
const { sendNotification } = require('./firebaseAdmin');

const createBeverage = async (beverageData) => {
    const {
        snackName: name,
        quantity,
        wholesalePrice: wholesale_price,
        sellPrice: selling_price,
        image,
        availability = true
    } = beverageData;

    const query = `
        INSERT INTO beverages (
            name, quantity, wholesale_price, selling_price,
            availability, image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            name,
            quantity,
            wholesale_price,
            selling_price,
            availability,
            image
        ]);
        await sendNotification(
            'New Beverage Added',
            `${name} has been added to the beverages menu`
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error creating beverage:', error);
        throw error;
    }
};


const createMeal = async (mealsData) => {
    const {
        snackName: name,
        quantity,
        wholesalePrice: wholesale_price,
        sellPrice: selling_price,
        image,
        availability = true
    } = mealsData;

    const query = `
        INSERT INTO meals (
            name,quantity,  wholesale_price, selling_price,
 availability, image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            name,
            quantity,
            wholesale_price, selling_price,
            availability,
            image
        ]);

        await sendNotification(
            'New meal Added',
            `${name} has been added to the meal menu`
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating meals:', error);
        throw error;
    }
};
const createSnacks = async (snacksData) => {
    const {
        snackName: name,
        quantity,
        wholesalePrice: wholesale_price,
        sellPrice: selling_price,
        image,
        availability = true
    } = snacksData;

    const query = `
        INSERT INTO snacks (
            name,quantity, wholesale_price, selling_price,
      availability, image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            name,
            quantity,
            wholesale_price, selling_price,
            availability,
            image
        ]);
        await sendNotification(
            'New Snack Added',
            `${name} has been added to the Snack menu`
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating snacks:', error);
        throw error;
    }
};

const getAllBeverages = async () => {
    const query = 'SELECT * FROM beverages ORDER BY created_at DESC';

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching beverages:', error);
        throw error;
    }
};
const getAllMeals = async () => {
    const query = 'SELECT * FROM meals ORDER BY created_at DESC';

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
};
const getAllSnacks = async () => {
    const query = 'SELECT * FROM snacks ORDER BY created_at DESC';

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching snacks:', error);
        throw error;
    }
};

const getBeverageById = async (id) => {
    const query = 'SELECT * FROM beverages WHERE id = $1';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching beverage:', error);
        throw error;
    }
};
const getSnacksById = async (id) => {
    const query = 'SELECT * FROM snacks WHERE id = $1';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching snacks:', error);
        throw error;
    }
};

const getMealsById = async (id) => {
    const query = 'SELECT * FROM meals WHERE id = $1';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
};

const deleteBeverageById = async (id) => {
    const query = 'DELETE FROM beverages WHERE id = $1 RETURNING *';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting beverage:', error);
        throw error;
    }
};
const deleteMealById = async (id) => {
    const query = 'DELETE FROM meals WHERE id = $1 RETURNING *';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting meal:', error);
        throw error;
    }
};

const deleteSnackById = async (id) => {
    const query = 'DELETE FROM snacks WHERE id = $1 RETURNING *';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting snack:', error);
        throw error;
    }
};

const createMenuItem = async (itemData) => {
    const {
        snackName: name,
        quantity,
        wholesalePrice: wholesale_price,
        sellPrice: selling_price,
        image,
        category,
        availability = true
    } = itemData;

    const query = `
        INSERT INTO menu_items (
            name, quantity, wholesale_price, selling_price,
            availability, image_url, item_type
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            name,
            quantity,
            wholesale_price,
            selling_price,
            availability,
            image,
            category
        ]);

        if (!result.rows[0]) {
            throw new Error('Failed to insert item into database');
        }

        await sendNotification(
            `New ${category} Added`,
            `${name} has been added to the menu`
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error creating menu item:', error);
        throw new Error(`Failed to create menu item: ${error.message}`);
    }
};

const getAllMenuItems = async (itemType = null) => {
    const query = itemType 
        ? 'SELECT * FROM menu_items WHERE item_type = $1 ORDER BY created_at DESC'
        : 'SELECT * FROM menu_items ORDER BY created_at DESC';

    try {
        const result = await pool.query(query, itemType ? [itemType] : []);
        return result.rows;
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
};

const getMenuItemById = async (id) => {
    const query = 'SELECT * FROM menu_items WHERE id = $1';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching menu item:', error);
        throw error;
    }
};
const getMenuItemByName=async(name)=>{
    const query=`SELECT * FROM menu_items WHERE name=$1`;
    try{
        const result=await pool.query(query,[name]);
        return result.rows[0];
    }catch(error){
        console.error('Error fetching menu item: ',error)
        throw error;
    }
}
const deleteMenuItemById = async (id) => {
    const query = 'DELETE FROM menu_items WHERE id = $1 RETURNING *';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting menu item:', error);
        throw error;
    }
};
const editMenuItemById = async (id, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    if (fields.length !== 0) {
        const setClause = fields.map((field, index) => `${field}=$${index + 1}`).join(",");
        values.push(id);
        const query = `UPDATE menu_items SET ${setClause} WHERE id=$${fields.length + 1}`;
        try {
            const result = await pool.query(query, values);
            console.log("Menu updated successfully: ", result);
            return result;
        } catch (error) {
            console.error("Error updating menu item: ", error);
            throw error;
        }
    }
}
module.exports = {
    createBeverage,
    getAllBeverages,
    getBeverageById,
    getAllMeals,
    createMeal,
    getMealsById,
    getAllSnacks,
    getSnacksById,
    createSnacks,
    deleteBeverageById,
    deleteSnackById,
    deleteMealById,
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    deleteMenuItemById,
    getMenuItemByName,
    editMenuItemById
};