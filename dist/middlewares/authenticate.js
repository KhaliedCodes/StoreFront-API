"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authenticate(req, res, next) {
    try {
        jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
}
exports.default = authenticate;
