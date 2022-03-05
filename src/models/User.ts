import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export type User = {
  id: Number;
  username: String;
  firstname: String;
  lastname: String;
  password: String;
};
const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export class UserDBContext {
  async index(): Promise<User[]> {
    
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(err as string);
    }
  }
  async show(id: number): Promise<User> {
    
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id = $1";
      
      const result = await conn.query(sql, [id]);
      conn.release();
      
      return result.rows[0];
    } catch (err) {
      throw new Object(err);
    }
  }
  async create(u: User): Promise<User> {
    console.log(u);
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `INSERT INTO users (username, password_digest, firstname, lastname) VALUES($1, $2, $3, $4) RETURNING *`;

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [u.username, hash, u.firstname, u.lastname]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Object(err);
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = `SELECT * FROM users WHERE username=($1)`;

    const result = await conn.query(sql, [username]);

    

    if(result.rows.length) {

        const user = result.rows[0]
  
  
        if (bcrypt.compareSync(password+pepper, user.password_digest)) {
          return user
        }
      }

    return null;
  }
}
