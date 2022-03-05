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
const express_1 = require("express");
const Order_1 = require("../models/Order");
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const validation_result_1 = require("express-validator/src/validation-result");
const context = new Order_1.OrderDBContext();
const orderRouter = (0, express_1.Router)();
exports.default = orderRouter;
orderRouter.get("/index", authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = jsonwebtoken_1.default.decode(req.body.token);
        const orders = yield context.index(payload.id);
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json({ err });
    }
}));
orderRouter.post("/complete", authenticate_1.default, (0, express_validator_1.query)('order_id').isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const payload = jsonwebtoken_1.default.decode(req.body.token);
        const order_id = parseInt(req.query.order_id);
        const order = yield context.completeOrder(order_id, payload.id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json({ err });
    }
}));
orderRouter.post("/create", authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = jsonwebtoken_1.default.decode(req.body.token);
        const order = yield context.create(payload.id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json({ err });
    }
}));
orderRouter.post("/addProduct", authenticate_1.default, (0, express_validator_1.query)('id').isNumeric(), (0, express_validator_1.body)('productId').isNumeric(), (0, express_validator_1.body)('quantity').isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const orderId = req.query.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    const user_id = jsonwebtoken_1.default.decode(req.body.token).id;
    try {
        const addedProduct = yield context.addProduct(quantity, orderId, productId, user_id);
        res.status(200).json(addedProduct);
    }
    catch (err) {
        res.status(400).json({ err });
    }
}));
