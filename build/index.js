"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/users", (req, res) => {
    res.status(200).send(database_1.users);
});
app.get("/products", (req, res) => {
    res.status(200).send(database_1.products);
});
app.get("/products", (req, res) => {
    const name = req.query.name;
    if (name) {
        const result = (0, database_1.searchProductsByName)(name);
        res.status(200).send(result);
    }
    else {
        res.send(database_1.products);
    }
});
app.post("/users", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const result = (0, database_1.createUser)(id, name, email, password);
    res.status(201).send(result);
});
app.post("/products", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const result = (0, database_1.createProduct)(id, name, price, description, imageUrl);
    res.status(201).send(result);
});
//# sourceMappingURL=index.js.map