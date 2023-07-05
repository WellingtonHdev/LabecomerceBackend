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

app.delete("/users/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id
    const userIndex = users.findIndex((user) => user.id === idToDelete)

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
    }
    res.status(200).send("Usuario deletado com sucesso!")
});

app.delete("/products/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id
    const productIndex = products.findIndex((product) => product.id === idToDelete)

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
    }
    res.status(200).send("Produto deletado com sucesso!")
});

app.put("/products/:id", (req: Request, res: Response)=> {
    const idToFind = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const product = products.find((product)=> product.id === idToFind)

    if(product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice ||product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }
    res.status(200).send("Produto atualizados com sucesso!")
})





// console.log(products)
// console.log(users)
// createProduct('u003', 'box', 22, 'uma caixa', 'urlImage')
// createUser('prod003', 'bixin', 'bixin@email.com', 'bixin123')
// console.table(getAllUsers())
// console.table(getAllProducts())
// console.log(searchProductsByName('BOX'))
