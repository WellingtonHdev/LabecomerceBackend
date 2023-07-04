import { TProducts, TUsers } from "./types";

export const getAllUsers = (): TUsers[] => {
  return users
}
export const getAllProducts = (): TProducts[] => {
  return products
}

export const createUser = (id: string, name: string, email: string, password: string): string => {
  const newUser: TUsers = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  return ("usuario criado com sucesso")
}

export const searchProductsByName = (name: string): TProducts[] => {
  const result = products.filter(product => {
    return product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())})
    return result
}

export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string): string => {
  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl
  }
  products.push(newProduct)
  return ("produto criado com sucesso!")
}

export const users: TUsers[] = [
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

export const products: TProducts[] = [
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

