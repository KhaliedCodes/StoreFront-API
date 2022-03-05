import client from "../database";
import dotenv from "dotenv";

dotenv.config();
export type Order = {
  id: Number;
  user_id: Number;
  status: String;
};

export class OrderDBContext {
  async index(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE users_id = $1";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Object(err);
    }
  }
  async create(user_id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `INSERT INTO orders (order_status, users_id) VALUES('open', $1) RETURNING *`;

      const result = await conn.query(sql, [user_id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`unable create order: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string,
    user_id: number
  ): Promise<Order> {
    try {
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`;
      const checkSql = `SELECT order_status FROM orders WHERE id = $1 AND users_id = $2 `;

      const conn = await client.connect();
      const checkRes = await conn.query(checkSql, [parseInt(orderId), user_id]);

      if (checkRes.rows[0].order_status == "completed") {
        throw new Object(
          "Cannot add more products to order as it is completed"
        );
      }
      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Object(err);
    }
  }
  async completeOrder(order_id: number, user_id: number) {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `UPDATE orders
          SET order_status = 'completed'
          WHERE users_id = $1 AND id = $2 RETURNING *`;

      const result = await conn.query(sql, [user_id, order_id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`unable create order: ${err}`);
    }
  }
}
