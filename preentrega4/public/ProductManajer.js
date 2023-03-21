import {
    randomUUID
} from 'crypto'
import fs from 'fs/promises'

//constructor para creacion de productos nuevos
export class Product {
    constructor({title, description, price, thumbnail, code, stock,category}) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.id = randomUUID();
    }
}



export class ProductManager {

    constructor(path) {
        this.products;
        this.path = path;
    }


    async readProducts() {
        const data = await fs.readFile(this.path, "utf-8");
        this.products = JSON.parse(data);
      }
    
    async getProducts() {
        await this.readProducts();
        return this.products;
      }


 
    async addProduct(title, description, price, thumbnail, stock, code,category) {



        try {
            await this.getProducts()
            
            const productFind = this.products.find((product) => product.title === title)
            if (productFind) {
                console.log('Ya existe un producto con ese titulo');
            }
    
            if (title !== undefined && description !== undefined && price !== undefined  && stock !== undefined && code !== undefined && category !== undefined) {
                const product = new Product({
                    title : title,
                    description : description,
                    price : price,
                    thumbnail : thumbnail,
                    stock : stock,
                    code : code,
                    category:category                    
                })
    
                this.products.push(product)
                const jsonProducts = JSON.stringify(this.products, null, 2)
                await fs.writeFile(this.path, jsonProducts)
    
            } 
            
        } catch (error) {
            throw new Error ("Los campos no pueden estar vacios")
        }
       
    }


    async getProductById(id) {
      
          const jsonProducts = await fs.readFile(this.path, 'utf-8')
          this.products = JSON.parse(jsonProducts)
  
          const productFind = this.products.find((product) => product.id === id)
          if (productFind === undefined) {
              throw new Error("producto no encontrado o ID invalido")
          } else {
  
              return productFind
          }
      
    }

async updateProduct(id, prodModificado) {
    
        const jsonProducts = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(jsonProducts)
    
        const product = this.products.find((prod) => prod.id === id);
        const indice = this.products.findIndex(p => p.id === id)
        
        if (!product) {
          throw new Error("El id no existe");
        }
        
        const nuevoProducto = new Product({ ...product, ...prodModificado})
        nuevoProducto.id=id
        this.products[indice] = nuevoProducto
        
        const jsonProductsModif = JSON.stringify(this.products, null, 2)
        
        console.log("El producto se actualizo con exito", nuevoProducto);
         await fs.writeFile(this.path, jsonProductsModif)
  }



    async deleteProduct(id) {
        const jsonProducts = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(jsonProducts)

        const productFindIndex = this.products.findIndex((product) => product.id === id)

        if (productFindIndex === -1) {
            throw new Error("Product Not found");
        } else {
            this.products.splice(productFindIndex, 1)
            console.log('Product deleted');

            const jsonProducts = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path, jsonProducts)
        }

    }
}

// const productManager = new ProductManager('../productos.txt');
// const prod1 = productManager.addProduct(    "tv12",   "descripcion prod 3",    4000,    "url imagen",     45,     "televisor");

// const prod2 = productManager.addProduct("tv2", "descripcion prod 2", 2500, "url imagen", 45);
// const prod3 = productManager.addProduct("tv3", "descripcion prod 3", 3500, "url imagen", 45);
// const prod4 = productManager.addProduct("tv4", "descripcion prod 3", 3500, "url imagen", 45);
// const prod5 = productManager.addProduct("tv5", "descripcion prod 3", 3500, "url imagen", 45);

// productManager.deleteProduct('6c80a977-dfa6-489a-a8a6-51d6861c26fd')

// console.log('console log de get products',await productManager.getProducts());

// console.log("producto filtrado por ID", productManager.getProductById('6c80a977-dfa6-489a-a8a6-51d6861c26fd'));


export class CartManager {
    constructor(path) {
        this.carts;
        this.path = path;
    }
    async readCarts() {
        const data = await fs.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data);
    }
    
    async getCarts() {
        await this.readCarts();
        return this.carts;
      }

async createCart (product) {
    await this.getCarts()

    const cart= [{
        "id":randomUUID(),
        }]
    
        cart.push(product)
        this.carts.push(cart)
    const jsonCarts = JSON.stringify(this.carts, null, 2)
    await fs.writeFile(this.path, jsonCarts)
    
}

async saveCart(){
   
    const jsonCarts = JSON.stringify(this.carts, null, 2)
    await fs.writeFile(this.path, jsonCarts)
}
async getCartById(id){
   
// console.log(id);

const carritos = await this.getCarts()

const carritoFiltrado = carritos.find(element =>element[0].id ===id)
const productos = carritoFiltrado[1]
//    console.log("carrito filtradoooooo2",productos);
   return productos
  
}

// async addProduct (id,product) {
//     await this.getCarts()
//     const carritoID = await this.getCartById(id)
    
//     carritoID.push(product.id)
// return carritoID
// }

}

// const carrito = new CartManager('../carrito.txt')





// const product = {
//     "title": "tv2",
//     "description": "descripcion prod 2",
//     "price": 2500,
//     "thumbnail": "url imagen",
//     "stock": 45,
//     "code": "televisor",
//     "category": "hogar",
//     "status": true,
//     "id": "44820200-b24d-478f-84e9-e69c4f8cf650"
//   };




// await carrito.addProduct("44820200-b24d-478f-84e9-e69c4f8cf650", product)
// console.log(await carrito.getCarts())
// // // await carrito.createCart()
// // // await carrito.createCart()
// // await carrito.createCart()
// // console.log(await carrito.getCarts())

// // console.log(await carrito.getCartById("7517199c-dd61-4d71-b48a-c1dd5c5f5310"))

// // await carrito.createCart(productoAgregar)

//  console.log("carrito",await carrito.getCartById('e8f5ba25-acca-4ce9-99e2-629ed11790dd'));

