"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const app = (0, express_1.default)();
const address = "localhost:3000";
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.raw());
app.use('/users', userRoute_1.default);
app.use('/products', productRoute_1.default);
app.use('/orders', orderRoute_1.default);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
