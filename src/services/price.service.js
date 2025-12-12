import { pool } from '../config/db.js';

// Получить все услуги (курсы)
export const getAllServices = async () => {
    const result = await pool.query('SELECT * FROM services');
    return result.rows;
};

// Получить пакет продуктов по услуге
export const getPackageByServiceId = async (serviceId) => {
    const result = await pool.query(`
        SELECT p.id, p.name, p.price
        FROM products p
        JOIN packages pkg ON pkg.product_id = p.id
        WHERE pkg.service_id = $1
    `, [serviceId]);
    return result.rows;
};

// Заменить продукт в пакете
export const replaceProductInPackage = async (serviceId, oldProductId, newProductId) => {
    await pool.query(`
        UPDATE packages
        SET product_id = $1
        WHERE service_id = $2 AND product_id = $3
    `, [newProductId, serviceId, oldProductId]);
};


