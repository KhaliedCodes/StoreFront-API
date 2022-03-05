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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Testing user router endpoints', () => {
    it('users/index endpoint expected to 401 without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/users/index");
        expect(result.status).toBe(401);
    }));
    it('users/index endpoint expected to 200 with token', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/users/index")
            .send({ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk" });
        expect(result.status).toBe(200);
    }));
    it('users/show endpoint expected to 401 without token ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/users/show");
        expect(result.status).toBe(401);
    }));
    it('users/create endpoint expected to 400 without a username or a password', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/users/create");
        expect(result.status).toBe(400);
    }));
    it('users/create endpoint expected to 201 with a username and a password', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/users/create")
            .send({
            username: "randy",
            password: "randy1234"
        });
        expect(result.status).toBe(201);
    }));
    it('users/show endpoint expected to 200 with token and id of an existing user otherwise returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/users/show")
            .send({ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk" })
            .query({ id: "1" });
        expect(result.status).toBe(200);
    }));
    it('users/create endpoint expected to 400 with a username less than 5 characters', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/users/create")
            .send({
            username: "rand",
            password: "rand1234"
        });
        expect(result.status).toBe(400);
    }));
    it('users/create endpoint expected to 400 with a password less than 8 characters', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/users/create")
            .send({
            username: "randy",
            password: "rand123"
        });
        expect(result.status).toBe(400);
    }));
    it('users/login endpoint expected to 400 with wrong username and password', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/users/login")
            .send({
            username: "randy",
            password: "rand123"
        });
        expect(result.status).toBe(400);
    }));
});
describe('Testing products router endpoints', () => {
    it('products/index endpoint expected to 200 ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/products/index");
        expect(result.status).toBe(200);
    }));
    it('products/create endpoint expected to 401 without a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/products/create");
        expect(result.status).toBe(401);
    }));
    it('products/create endpoint expected to 400 without a name or a price', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/products/create")
            .send({ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk" });
        expect(result.status).toBe(400);
    }));
    it('products/create endpoint expected to 400 with non numeric price', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/products/create")
            .send({
            product_name: "randy",
            price: "rand1234",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"
        });
        expect(result.status).toBe(400);
    }));
    it('products/create endpoint expected to 200 with valid name and price', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/products/create")
            .send({
            product_name: "aseer",
            price: "1234",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk"
        });
        expect(result.status).toBe(200);
    }));
    it('products/show endpoint expected to 200 with an id of an existing product otherwise is 400 ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/products/show")
            .query({ id: 1 });
        expect(result.status).toBe(200);
    }));
});
describe('Testing orders router endpoints', () => {
    it('orders/index endpoint expected to 401 without token ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/orders/index");
        expect(result.status).toBe(401);
    }));
    it('orders/index endpoint expected to 200 with token ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/orders/index")
            .send({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk" });
        expect(result.status).toBe(200);
    }));
    it('orders/create endpoint expected to 200 with token ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/orders/create")
            .send({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk" });
        expect(result.status).toBe(200);
    }));
    it('orders/complete endpoint expected to 200 with token and order_id that exists ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/orders/complete")
            .send({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJraGFsZWQiLCJpYXQiOjE2NDI5NjY2NDl9.Ei5_JB7UY4HuCrKzJEZp7ep0_CS-HrSESVp2DiwDcrk" })
            .query({ order_id: "1" });
        expect(result.status).toBe(200);
    }));
});
