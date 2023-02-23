let counter = 0

class Product {
    constructor(title, description, price, thumbnail, code, stock) {

        let accepted = true

        if (!title) {
            console.log('- La propiedad title es obligatoria')
            accepted = false
        }
        if (!description) {
            console.log('- La propiedad description es obligatoria')
            accepted = false
        }
        if (!price) {
            console.log('- La propiedad price es obligatoria')
            accepted = false
        }
        if (!thumbnail) {
            console.log('- La propiedad thumbnail es obligatoria')
            accepted = false
        }
        if (!code) {
            console.log('- La propiedad code es obligatoria')
            accepted = false
        }
        if (!stock) {
            console.log('- La propiedad stock es obligatoria')
            accepted = false
        }

        if (accepted) {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code
            this.stock = stock
        } else {
            console.log('No se creo el producto porque no cumple con todas las propiedades')
        }
    }
}

class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
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
                    console.log('Producto añadido\n')
                )

        }
    }

    getProducts() {
        console.log('\n\n--- Lista de productos ---');
        return console.log(this.products)
    }

    getProductById(id) {
        console.log('\nBuscando el producto con id ' + id + '\n');
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? console.log(this.products.find((prod) => prod.id === id))
            : console.log('--- Not found ---\n\n')
    }

}

/* Declaracion de la clase ProductManager */
const manager = new ProductManager

/* Añadiendo elementos tipo Product */
manager.addProduct(new Product('Product1', 'Este es el producto1', 700, 'www.imagenUrl1.blablabla', 2, 30))
manager.addProduct(new Product('Product2', 'Este es el producto2', 400, 'www.imagenUrl2.blablabla', 3, 30))
manager.addProduct(new Product('Product3', 'Este es el producto3', 770, 'www.imagenUrl3.blablabla', 2, 30))
manager.addProduct(new Product('Product4', 'Este es el producto4', 101, 'www.imagenUrl4.blablabla', 3, 0))
manager.addProduct(new Product('Product5', 'Este es el producto5', 0, 'www.imagenUrl5.blablabla', 2, 30))

/* Metodo getProductById */
manager.getProductById(2)  //   Si existe
manager.getProductById(12) //   No existe
manager.getProductById(20) //   No existe
manager.getProductById(4)  //   No existe porque no cumple con las propiedades
manager.getProductById(1)  //   Si existe

/* Metodo getProducts */
manager.getProducts()