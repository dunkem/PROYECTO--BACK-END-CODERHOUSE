import fs from 'fs/promises'
//import { randomUUID } from 'crypto'
/*
En esta ocasion decidi no usarlo porque con el counter autoincrementable es mas facil de escribir entre los metodos;
pero si lo tengo presente para optimizar mis codigos futuros.
 */

//Contador para las id de los productos
let counter = 0
//Con esta variable valido que el archivo no se cargue con cada llamada al metodo que lo carga
let loadSuccess = true

//Objeto Product
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        const map = new Map([[title], [description], [price], [thumbnail], [code], [stock]])
        if (map.has("") || map.has(0)) {
            console.log("Todos los campos son obligatorios, creación de producto fallida");
        } else {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code
            this.stock = stock
            console.log("Se creo el producto");
        }
    }
}

//Clase principal
class ProductManager {

    constructor(path) {
        this.path = path
        this.products = []
    }

    async cargar() {
        let file, prod = null
        loadSuccess
            ? (
                file = await fs.readFile(this.path, 'utf-8'),
                prod = JSON.parse(file),
                prod.forEach(element => {
                    counter++
                    element.id = counter
                    this.products.push(element)
                },
                    loadSuccess = false)
            )
            : ''
    }

    async getProducts() {
        await this.cargar()
        console.log("Lista de productos")
        return console.log(this.products)
    }

    async addProduct(product) {
        await this.cargar()
        let json = null;
        if (Object.entries(product).length === 0) {
            console.log('No se añadio el producto, verificar propiedades\n\n');
        } else {
            const codeRepeated = this.products.some((prod) => prod.code === product.code)
            codeRepeated
                ? console.log('El codigo ' + product.code + ' esta repetido, no se añadio el producto\n\n')
                : (
                    counter++,
                    product.id = counter,
                    this.products.push(product),
                    json = JSON.stringify(this.products, null, 4),
                    await fs.writeFile(this.path, json),
                    console.log('Producto añadido\n')
                )
        }
    }

    async getProductById(id) {
        await this.cargar()
        console.log('\nBuscando el producto con id ' + id + '\n');
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? console.log(this.products.find((prod) => prod.id === id))
            : console.log('--- Not found ---\n\n')
    }

    async updateProduct(id, campo, data) {
        await this.cargar()
        let json, i = null;
        const modificar = (i, campo, data) => {
            switch (campo) {
                case 'title':
                    this.products[i].title = data
                    break
                case 'description':
                    this.products[i].description = data
                    break
                case 'price':
                    this.products[i].price = data
                    break
                case 'thumbnail':
                    this.products[i].thumbnail = data
                    break
                case 'code':
                    this.products[i].code = data
                    break
                case 'stock':
                    this.products[i].stock = data
                    break
            }
        }
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? (console.log('Modificando el ' + campo + ' del producto con el id ' + id),
                i = this.products.findIndex((prod) => prod.id === id),
                modificar(i, campo, data),
                json = JSON.stringify(this.products, null, 4),
                await fs.writeFile(this.path, json))
            : console.log('--- Not found ---\n\n')

    }

    async deleteProduct(id) {
        await this.cargar()
        let json, i = null
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? (
                i = this.products.findIndex((prod) => prod.id === id),
                this.products.splice(i, 1),
                json = JSON.stringify(this.products, null, 4),
                await fs.writeFile(this.path, json),
                console.log('Producto con id: ' + id + ' eliminado')
            )
            : console.log('--- Not found ---\n\n')
    }

}


// Comenzamos a inicializar el Product manager con el path de atributo
/*
    El metodo getProducts() mostrara productos sin haber agregado con el metodo addProduct(...) si el archivo con formato
    "json" contiene ya elementos dentro de el... Si el archivo tipo "json" esta vacio al llamar el metodo getproducts() 
    mostrara un array vacio
 */
const manager = new ProductManager("archivos de entrada/prueba.txt")
//Añadiendo elementos tipo Product al productManager
await manager.addProduct(new Product("producto1", "description1", 11, "thumbnail1", 11, 1))
await manager.addProduct(new Product("producto2", "description2", 21, "thumbnail2", 21, 2))
await manager.addProduct(new Product("producto3", "description3", 31, "thumbnail3", 31, 3))
// EL metodo updateProduct(id del producto, campo a modificar en String, nuevo valor String/Integer/... dependiendo el caso)
await manager.updateProduct(2, 'description', 'Descripcion modificada 2')
await manager.updateProduct(3, 'stock', 56)
// Metodo getProducts() ---Listado de productos---
await manager.getProducts()
// Metodo deleteProduct(id del producto) eliminara el producto o mostrara el mensaje "---Not found---"
await manager.deleteProduct(2)
await manager.getProducts()
// El metodo getProductById(id del producto) mostrara el producto o mostrara el mensaje "---Not found---" 
manager.getProductById(3)