"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDBContext = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class OrderDBContext {
    index(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE users_id = $1";
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Object(err);
            }
        });
    }
    create(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO orders (order_status, users_id) VALUES('open', $1) RETURNING *`;
                const result = yield conn.query(sql, [user_id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`unable create order: ${err}`);
            }
        });
    }
    addProduct(quantity, orderId, productId, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`;
                const checkSql = `SELECT order_status FROM orders WHERE id = $1 AND users_id = $2 `;
                const conn = yield database_1.default.connect();
                const checkRes = yield conn.query(checkSql, [parseInt(orderId), user_id]);
                if (checkRes.rows[0].order_status == "completed") {
                    throw new Object("Cannot add more products to order as it is completed");
                }
                const result = yield conn.query(sql, [quantity, orderId, productId]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Object(err);
            }
        });
    }
    completeOrder(order_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `UPDATE orders
          SET order_status = 'completed'
          WHERE users_id = $1 AND id = $2 RETURNING *`;
                const result = yield conn.query(sql, [user_id, order_id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`unable create order: ${err}`);
            }
        });
    }
}
exports.OrderDBContext = OrderDBContext;
