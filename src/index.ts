import { createProduct, createUser, getAllProducts, getAllUsers, products, searchProductsByName, users } from "./database";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { error } from "console";

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
    try {
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send("Error ao acessar o endpoint!")
    }

});

app.get("/products", (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400)
                throw new Error("O nome deve ter mais de 1 caracter")
            }
        }
        if (name) {
            const result = searchProductsByName(name)
            res.status(200).send(result);
        }
        res.send(products);

    } catch (Error: any) {
        res.send(Error.message)
    }
});

app.post("/users", (req: Request, res: Response) => {
    try {
        const emailRegex = /\S+@\S+.\S+/;
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if (id.length < 4 || id[0] !== "u" || users.find(user => user.id === id)) {
            res.status(400)
            if (id.length < 4) {
                throw new Error("O id deve ter no minimo 4 caracteres")
            } else if (id[0] !== "u") {
                throw new Error("O id deve começar com a letra 'U")
            }
            throw new Error("O id já existe")
        }
        if (!emailRegex.test(email) || users.find(user => user.email === email)) {
            res.status(400)
            if (!emailRegex.test(email)) {
                throw new Error("Digite um email valido")
            }
            throw new Error("Email já existente, tente outro")
        }
        if (password.length < 8) {
            res.status(400)
            throw new Error("A senha deve ter no mínimo 8 caracteres")
        }
        if (!name) {
            res.status(400)
            throw new Error("Digite um name")
        }

        const result = createUser(id, name, email, password)

        res.status(201).send(result);

    } catch (Error: any) {
        res.send(Error.message)
    }
});

app.post("/products", (req: Request, res: Response) => {
    try {

        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string
        if (id.length < 7 || !id.startsWith("prod") || products.find(product => product.id === id)) {
            res.status(400)
            if (id.length < 7) {
                throw new Error("O id deve ter no minimo 7 caracteres, começando com 'prod' e os numeros em seguida")
            } else if (!id.startsWith("prod")) {
                throw new Error("O id deve começar sempre com a sigla 'prod'")
            }
            throw new Error("O id já existe, tente outro")
        }
        if (!name) {
            res.status(400)
            throw new Error("Digite um name")
        }
        if (!price) {
            res.status(400)
            throw new Error("Digite um price")
        }
        if (!description) {
            res.status(400)
            throw new Error("Digite uma description")
        }
        if (!imageUrl) {
            res.status(400)
            throw new Error("Digite uma imageUrl")
        }

        const result = createProduct(id, name, price, description, imageUrl)

    } catch (Error: any) {
        res.send(Error.message);
    }
});

app.delete("/users/:id", (req: Request, res: Response) => {
    try {

        const idToDelete = req.params.id
        const userIndex = users.findIndex((user) => user.id === idToDelete)

        if (userIndex < 0) {
            res.status(400)
            throw new Error("Esse usuario não existe")
        }
        users.splice(userIndex, 1)
        res.status(200).send("Usuario deletado com sucesso!")
    } catch (Error: any) {
        res.send(Error.message)

    }
});

app.delete("/products/:id", (req: Request, res: Response) => {
    try {

        const idToDelete = req.params.id
        const productIndex = products.findIndex((product) => product.id === idToDelete)

        if (productIndex < 0) {
            res.status(400)
            throw new Error("Esse produto não existe")
        }
        products.splice(productIndex, 1)
        res.status(200).send("Produto deletado com sucesso!")
    } catch (Error: any) {
        res.send(Error.message)
    }
});

app.put("/products/:id", (req: Request, res: Response) => {
    try {

        const idToFind = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined

        const product = products.find((product) => product.id === idToFind)
        if (!product) {
            res.status(400)
            throw new Error("Esse produto não existe")
        }

        if (!newId && !newName && !newPrice && !newDescription && !newImageUrl || newId === product.id && newName === product.name && newDescription === product.description && newImageUrl === product.imageUrl) {
            res.status(400)
            throw new Error("Para editar o produto é necessario alterar algma informação")
        }


        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl

        res.status(200).send("Produto atualizados com sucesso!")
    } catch (Error: any) {
        res.send(Error.message)
    }
})





// console.log(products)
// console.log(users)
// createProduct('u003', 'box', 22, 'uma caixa', 'urlImage')
// createUser('prod003', 'bixin', 'bixin@email.com', 'bixin123')
// console.table(getAllUsers())
// console.table(getAllProducts())
// console.log(searchProductsByName('BOX'))
