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
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_validator_1 = require("express-validator");
const validation_result_1 = require("express-validator/src/validation-result");
dotenv_1.default.config();
const context = new User_1.UserDBContext();
const userRouter = (0, express_1.Router)();
userRouter.get("/index", authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield context.index();
    res.json(users);
}));
userRouter.get("/show", authenticate_1.default, (0, express_validator_1.query)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield context.show(parseInt(req.query.id));
        if (user)
            res.status(200).json(user);
        else
            res.status(400).json({ Error: "User not found" });
    }
    catch (err) {
        return res.status(401).json({ Error: err });
    }
}));
userRouter.post("/create", (0, express_validator_1.body)('username').isLength({ min: 5, max: 20 }), (0, express_validator_1.body)('password').isLength({ min: 8 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield context.create(req.body);
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET);
        res.status(201).json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
userRouter.post("/login", (0, express_validator_1.body)('username').isLength({ min: 5, max: 20 }), (0, express_validator_1.body)('password').isLength({ min: 8 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const username = req.body.username;
    const password = req.body.password;
    const user = yield context.authenticate(username, password);
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET);
        res.status(200).json(token);
    }
    else {
        res.status(400).json({ error: "Login failed" });
    }
}));
exports.default = userRouter;
