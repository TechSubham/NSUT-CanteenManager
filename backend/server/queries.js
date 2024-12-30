const pool = require('./db');

const createBeverage = async (beverageData) => {
    const {
        name,
        description,
        wholesale_price,
        selling_price,
        rating,
        availability,
        image_url
    } = beverageData;

    const query = `
        INSERT INTO beverages (
            name, description, wholesale_price, selling_price,
            rating, availability, image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            name,
            description,
            wholesale_price,
            selling_price,
            rating,
            availability,
            image_url
        ]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating beverage:', error);
        throw error;
    }
};
const createMeal = async (mealsData) => {
    const {
        name,
        description,
        wholesale_price,
        selling_price,
        rating,
        availability,
        image_url
    } = mealsData;

    const query = `
        INSERT INTO meals (
            name, description, wholesale_price, selling_price,
            rating, availability, image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            name,
            description,
            wholesale_price,
            selling_price,
            rating,
            availability,
            image_url
        ]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating meals:', error);
        throw error;
    }
};
const createSnacks = async (snacksData) => {
    const {
        name,
        description,
        wholesale_price,
        selling_price,
        rating,
        availability,
        image_url
    } = snacksData;

    const query = `
        INSERT INTO snacks (
            name, description, wholesale_price, selling_price,
            rating, availability, image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            name,
            description,
            wholesale_price,
            selling_price,
            rating,
            availability,
            image_url
        ]);
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
};