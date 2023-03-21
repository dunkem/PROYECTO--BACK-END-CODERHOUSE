import express, {
    Router
} from 'express';
import {
    CartManager,
    Product,
    ProductManager
} from '../../public/productManajer.js';
import {
    randomUUID
} from 'crypto'


export const cartsRouter = Router()
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({
    extended: true
}))


const productManager = new ProductManager('./productos.txt');
const cartManager = new CartManager('./carrito.txt')

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid
        const carritoID = await cartManager.getCartById(id)

        res.json(carritoID)
    } catch (error) {
        throw new Error("id de carrito no encontrado ")
    }

})


cartsRouter.get('/', async (req, res) => {

    res.send(await cartManager.getCarts())
})



cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        const productos = await productManager.getProducts()
        const carritos = await cartManager.getCarts()

        //obtengo producto PID
        const productoFiltrado = await productos.filter(element => element.id === pid)
        const id = productoFiltrado[0].id
        

        // Obtengo el carrito que brindan de CID

        const pr = carritos.filter(elemento => elemento[0].id === cid)
       
        //push del ID del producto filtrado por PID al carrito
        pr[0].push({
            id
        })

        await cartManager.saveCart()

        res.json(pr);

    } catch (error) {
        throw new Error('id no encontrado')
    }
})