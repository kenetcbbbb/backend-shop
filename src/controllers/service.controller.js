import { pool } from "../config/db.js";

// Получить все сервисы
export const getServices = async (req, res) => {
  try {
    const services = await pool.query("SELECT * FROM services");
    res.json(services.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

// Получить сервис по ID вместе с продуктами
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await pool.query(
      "SELECT * FROM services WHERE id = $1",
      [id]
    );

    if (service.rows.length === 0) {
      return res.status(404).json({ error: "Сервис не найден" });
    }

    const products = await pool.query(
      `
      SELECT p.id, p.name, p.price
      FROM products p
      JOIN packages pkg ON pkg.product_id = p.id
      WHERE pkg.service_id = $1
      `,
      [id]
    );

    res.json({
      service: service.rows[0],
      products: products.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};