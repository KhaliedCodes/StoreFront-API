import client from "../database";
export type Product = {
  id: Number;
  product_name: String;
  price: Number;
  category: String;
};

export class ProductDBContext{
    async index(): Promise<Product[]> {
    
        try {
          const conn = await client.connect();
          const sql = "SELECT * FROM products";
          const result = await conn.query(sql);
          conn.release();
          return result.rows;
        } catch (err) {
          throw new Object(err);
        }
      }
      async show(id: number): Promise<Product> {
        
        try {
          const conn = await client.connect();
          const sql = "SELECT * FROM products WHERE id = $1";
          const result = await conn.query(sql, [id]);
          conn.release();
          return result.rows[0];
        } catch (err) {
          throw new Object(err);
        }
      }
      async create(p: Product): Promise<Product> {
        try {
          // @ts-ignore
          const conn = await client.connect();
          const sql = `INSERT INTO products (product_name, price, category) VALUES($1, $2, $3) RETURNING *`;
    
    
          const result = await conn.query(sql, [p.product_name, p.price, p.category]);
          const product = result.rows[0];
    
          conn.release();
    
          return product;
        } catch (err) {
          throw new Object(err);
        }
      }
}