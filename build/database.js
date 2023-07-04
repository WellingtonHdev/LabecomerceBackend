"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.users = exports.createProduct = exports.searchProductsByName = exports.createUser = exports.getAllProducts = exports.getAllUsers = void 0;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const createUser = (id, name, email, password) => {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    exports.users.push(newUser);
    return ("usuario criado com sucesso");
};
exports.createUser = createUser;
const searchProductsByName = (name) => {
    const result = exports.products.filter(product => {
        return product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
    });
    return result;
};
exports.searchProductsByName = searchProductsByName;
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    exports.products.push(newProduct);
    return ("produto criado com sucesso!");
};
exports.createProduct = createProduct;
exports.users = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString(),
    },
    {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: new Date().toISOString(),
    },
];
exports.products = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    },
];
//# sourceMappingURL=database.js.map