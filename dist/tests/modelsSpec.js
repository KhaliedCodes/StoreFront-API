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
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const Product_1 = require("../models/Product");
const userContext = new User_1.UserDBContext();
const productContext = new Product_1.ProductDBContext();
const orderContext = new Order_1.OrderDBContext();
let user = {
    id: 21,
    username: "Randysorton",
    password: "orton1234",
    firstname: "randys",
    lastname: "orton"
};
let product = {
    id: 21,
    product_name: "Randysorton",
    price: 123,
    category: "randys"
};
describe('Testing user model', () => {
    it('index method expected to return an array of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userContext.index();
        expect(result).toBeInstanceOf(Array);
    }));
    it('create method expected to return a user object after success', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userContext.create(user);
        expect(result).toBeInstanceOf(Object);
    }));
    it('show method expected to return a user object ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userContext.show(1);
        expect(result).toBeInstanceOf(Object);
    }));
    it('login method expected to be a user object with correct credintials', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userContext.authenticate(user.username, user.password);
        expect(result).toBeInstanceOf(Object);
    }));
    it('login method expected to be null with wrong credintials', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userContext.authenticate("Anything", "Goes");
        expect(result).toBe(null);
    }));
});
describe('Testing product model', () => {
    it('index endpoint expected to reuturn an array of products ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productContext.index();
        expect(result).toBeInstanceOf(Array);
    }));
    it('create expected to return a product object after success', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productContext.create(product);
        expect(result).toBeInstanceOf(Object);
    }));
    it('show expected to return a product object after success ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productContext.show(1);
        expect(result).toBeInstanceOf(Object);
    }));
});
describe('Testing orders router endpoints', () => {
    it('index endpoint expected to reuturn an array of orders ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderContext.index(1);
        expect(result).toBeInstanceOf(Array);
    }));
    it('create expected to return an order object after success', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderContext.create(1);
        expect(result).toBeInstanceOf(Object);
    }));
    it('completeOrder expected to return an order object after success ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderContext.completeOrder(1, 1);
        expect(result).toBeInstanceOf(Object);
    }));
});
