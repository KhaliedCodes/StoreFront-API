import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  TEST_USER,
  TEST_PASSWORD,
  PORT,
  ENV,
} = process.env;

 let client: Pool;
 
console.log(ENV)

if (ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: TEST_USER,
    password: TEST_PASSWORD,
    port: parseInt(PORT as string)
  });
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(PORT as string)
  });
}

export default client;
