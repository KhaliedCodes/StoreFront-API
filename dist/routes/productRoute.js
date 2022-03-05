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
const Product_1 = require("../models/Product");
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const express_validator_1 = require("express-validator");
const validation_result_1 = require("express-validator/src/validation-result");
const context = new Product_1.ProductDBContext();
const productRouter = (0, express_1.Router)();
exports.default = productRouter;
productRouter.get("/index", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield context.index();
    res.json(products);
}));
productRouter.get("/show", (0, express_validator_1.query)('id').isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = yield context.show(parseInt(req.query.id));
        if (product)
            res.status(200).json(product);
        else
            res.status(400).json({ Error: "Product not found" });
    }
    catch (err) {
        return res.status(400).json({ Error: err });
    }
}));
productRouter.post("/create", authenticate_1.default, (0, express_validator_1.body)('product_name').isAlpha(), (0, express_validator_1.body)('price').isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const addedProduct = yield context.create(req.body);
        res.status(200).json(addedProduct);
    }
    catch (err) {
        res.status(400).json({ err });
    }
}));
