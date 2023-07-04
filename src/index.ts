import { createProduct, createUser, getAllProducts, getAllUsers, products, searchProductsByName, users } from "./database";
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
});

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products);
});

app.get("/products", (req: Request, res: Response) => {
    const name = req.query.name as string
    if (name) {
        const result = searchProductsByName(name)
        res.status(200).send(result);
    } else {
        res.send(products);
    }
});

app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string

    const result = createUser(id, name, email, password)

    res.status(201).send(result);
});

app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const result = createProduct(id, name, price, description, imageUrl)

    res.status(201).send(result);
});





// console.log(products)
// console.log(users)
// createProduct('u003', 'box', 22, 'uma caixa', 'urlImage')
// createUser('prod003', 'bixin', 'bixin@email.com', 'bixin123')
// console.table(getAllUsers())
// console.table(getAllProducts())
// console.log(searchProductsByName('BOX'))
