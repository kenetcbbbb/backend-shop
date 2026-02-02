import { pool } from "../config/db.js";

export const createOrder = async (req, res) => {
  console.log("BACKEND UPDATED");
  try {
    let { serviceId, products } = req.body;

    if (!serviceId || !Array.isArray(products)) {
      return res.status(400).json({ status: "error", message: "Missing serviceId or products" });
    }

    // Приводим все id к числам
    products = products.map(p => Number(p));

    console.log("REQ.BODY:", req.body);
    console.log("Products converted:", products);

    // Берём товары, которые входят в пакет услуги
    const selectedProductsResult = await pool.query(
      `SELECT p.id, p.name, p.price::float AS price
       FROM products p
       JOIN packages pkg ON pkg.product_id = p.id
       WHERE pkg.service_id = $1
         AND p.id = ANY($2::int[])`,
      [serviceId, products]
    );

    console.log("Query result rows:", selectedProductsResult.rows);

    // Если нет доп-услуг — это нормально
    const addons = selectedProductsResult.rows || [];

    // Получаем цену услуги
    const serviceResult = await pool.query(
      "SELECT price::float AS price FROM services WHERE id = $1",
      [serviceId]
    );

    if (!serviceResult.rows.length) {
      return res.status(400).json({ status: "error", message: "Service not found" });
    }

    const basePrice = serviceResult.rows[0].price;

    // Считаем сумму выбранных товаров
    const addonsTotal = addons.reduce((sum, item) => sum + item.price, 0);

    // Итоговая сумма
    const totalPrice = basePrice + addonsTotal;

    // Сохраняем заказ
    const insertOrder = await pool.query(
      "INSERT INTO orders(service_id, total_price) VALUES($1, $2) RETURNING id, created_at",
      [serviceId, totalPrice]
    );
    const orderId = insertOrder.rows[0].id;

    // Сохраняем товары заказа
    for (let product of addons) {
      await pool.query(
        "INSERT INTO order_products(order_id, product_id) VALUES($1, $2)",
        [orderId, product.id]
      );
    }

    // Возвращаем заказ фронту
    res.json({
      status: "success",
      order: {
        id: orderId,
        serviceId,
        products: addons,
        totalPrice,
        createdAt: insertOrder.rows[0].created_at
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};