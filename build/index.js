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
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        res.status(500).send("Error ao acessar o endpoint!");
    }
});
app.get("/products", (req, res) => {
    try {
        const name = req.query.name;
        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400);
                throw new Error("O nome deve ter mais de 1 caracter");
            }
        }
        if (name) {
            const result = (0, database_1.searchProductsByName)(name);
            res.status(200).send(result);
        }
        res.send(database_1.products);
    }
    catch (Error) {
        res.send(Error.message);
    }
});
app.post("/users", (req, res) => {
    try {
        const emailRegex = /\S+@\S+.\S+/;
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (id.length < 4 || id[0] !== "u" || database_1.users.find(user => user.id === id)) {
            res.status(400);
            if (id.length < 4) {
                throw new Error("O id deve ter no minimo 4 caracteres");
            }
            else if (id[0] !== "u") {
                throw new Error("O id deve começar com a letra 'U");
            }
            throw new Error("O id já existe");
        }
        if (!emailRegex.test(email) || database_1.users.find(user => user.email === email)) {
            res.status(400);
            if (!emailRegex.test(email)) {
                throw new Error("Digite um email valido");
            }
            throw new Error("Email já existente, tente outro");
        }
        if (password.length < 8) {
            res.status(400);
            throw new Error("A senha deve ter no mínimo 8 caracteres");
        }
        if (!name) {
            res.status(400);
            throw new Error("Digite um name");
        }
        const result = (0, database_1.createUser)(id, name, email, password);
        res.status(201).send(result);
    }
    catch (Error) {
        res.send(Error.message);
    }
});
app.post("/products", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
        if (id.length < 7 || !id.startsWith("prod") || database_1.products.find(product => product.id === id)) {
            res.status(400);
            if (id.length < 7) {
                throw new Error("O id deve ter no minimo 7 caracteres, começando com 'prod' e os numeros em seguida");
            }
            else if (!id.startsWith("prod")) {
                throw new Error("O id deve começar sempre com a sigla 'prod'");
            }
            throw new Error("O id já existe, tente outro");
        }
        if (!name) {
            res.status(400);
            throw new Error("Digite um name");
        }
        if (!price) {
            res.status(400);
            throw new Error("Digite um price");
        }
        if (!description) {
            res.status(400);
            throw new Error("Digite uma description");
        }
        if (!imageUrl) {
            res.status(400);
            throw new Error("Digite uma imageUrl");
        }
        const result = (0, database_1.createProduct)(id, name, price, description, imageUrl);
    }
    catch (Error) {
        res.send(Error.message);
    }
});
app.delete("/users/:id", (req, res) => {
    try {
        const idToDelete = req.params.id;
        const userIndex = database_1.users.findIndex((user) => user.id === idToDelete);
        if (userIndex < 0) {
            res.status(400);
            throw new Error("Esse usuario não existe");
        }
        database_1.users.splice(userIndex, 1);
        res.status(200).send("Usuario deletado com sucesso!");
    }
    catch (Error) {
        res.send(Error.message);
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const idToDelete = req.params.id;
        const productIndex = database_1.products.findIndex((product) => product.id === idToDelete);
        if (productIndex < 0) {
            res.status(400);
            throw new Error("Esse produto não existe");
        }
        database_1.products.splice(productIndex, 1);
        res.status(200).send("Produto deletado com sucesso!");
    }
    catch (Error) {
        res.send(Error.message);
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const idToFind = req.params.id;
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImageUrl = req.body.imageUrl;
        const product = database_1.products.find((product) => product.id === idToFind);
        if (!product) {
            res.status(400);
            throw new Error("Esse produto não existe");
        }
        if (!newId && !newName && !newPrice && !newDescription && !newImageUrl || newId === product.id && newName === product.name && newDescription === product.description && newImageUrl === product.imageUrl) {
            res.status(400);
            throw new Error("Para editar o produto é necessario alterar algma informação");
        }
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.description = newDescription || product.description;
        product.imageUrl = newImageUrl || product.imageUrl;
        res.status(200).send("Produto atualizados com sucesso!");
    }
    catch (Error) {
        res.send(Error.message);
    }
});
//# sourceMappingURL=index.js.map