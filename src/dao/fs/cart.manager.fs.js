import fs from "fs/promises";
import {
  ErrorInvalidQuantity,
  ErrorNotFound,
} from "../../models/error/errors.model.js";

async function populateCar(cart) {
  try {
    const productsData = await fs.readFile(
      "./src/database/productos.json",
      "utf-8"
    );
    const products = JSON.parse(productsData);

    const populatedCart = await Promise.all(
      cart.map(async (cartItem) => {
        const product = products.find(
          (product) => product.id === cartItem.product
        );
        if (!product) {
          throw new ErrorNotFound(
            `Producto con ID ${cartItem.productId} no encontrado`
          );
        }
        return {
          product: { ...product },
          quantity: cartItem.quantity,
        };
      })
    );

    return populatedCart;
  } catch (error) {
    throw error;
  }
}

export default class cartsManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  async #loadCarts() {
    const json = await fs.readFile(this.#path, "utf-8");
    this.carts = JSON.parse(json);
  }

  async #writeCarts() {
    const write = JSON.stringify(this.carts, null, 2);
    await fs.writeFile(this.#path, write);
  }

  async add(cart) {
    await this.#loadCarts();
    this.carts.push(cart);
    await this.#writeCarts();
    return cart;
  }

  async getCartById(cid) {
    await this.#loadCarts();
    const finder = this.carts.find((c) => c.id === cid);
    if (!finder) {
      throw new ErrorNotFound(`Cart Not Found`);
    }
    return finder;
  }

  async getPInCartById(id) {
    await this.#loadCarts();
    const finder = this.carts.find((c) => c.id === id);
    if (!finder) {
      throw new ErrorNotFound("Cart Not Found");
    }
    return finder.products;
  }

  async getProductsInCartById(id) {
    await this.#loadCarts();
    const finder = this.carts.find((c) => c.id === id);
    if (!finder) {
      throw new ErrorNotFound("Cart Not Found");
    }
    const cartPop = await populateCar(finder.products);
    return cartPop;
  }

  async addProductInCart(cid, pid, qt) {
    const products = await this.getPInCartById(cid);
    const serchprod = products.find((p) => p.id === pid);
    if (!serchprod) {
      const finder = await this.getCartById(cid);
      finder.products.push({ product: pid, quantity: qt });
    } else {
      serchprod.quantity += qt;
    }
    await this.#writeCarts();
    return serchprod;
  }

  async delProductInCart(cid, pid) {
    const cart = await this.getCartById(cid);
    const products = cart.products;
    const deleter = products.filter((p) => p.product !== pid);
    cart.products = deleter;
    await this.#writeCarts();
    return deleter;
  }

  async updateCart(cid, updcart) {
    const cart = await this.getCartById(cid);
    cart.products = updcart;
    await this.#writeCarts();
    return cart.products;
  }

  async updProductInCart(cid, pid, updquantity) {
    const cart = await this.getCartById(cid);
    const products = cart.products;
    const serchprod = products.find((p) => p.product === pid);
    if (!serchprod) {
      throw new ErrorNotFound("Not Found");
    }
    if (isNaN(updquantity.quantity) || updquantity.quantity < 0) {
      throw new ErrorInvalidQuantity("Invalid Quantity");
    }
    serchprod.quantity = updquantity.quantity;
    cart.products = products;
    await this.#writeCarts();
    return cart.products;
  }

  async delAllProductsInCart(cid) {
    const cart = await this.getCartById(cid);
    cart.products = [];
    await this.#writeCarts();
    const cartdel = await this.getCartById(cid);
    return cartdel;
  }

  async deleteCart(cid) {
    const finder = await this.getCartById(cid);
    if (!finder) {
      throw new ErrorNotFound(`Cart Not Found`);
    }
    const deleter = this.carts.filter((e) => e.id !== cid);
    this.carts = deleter;
    await this.#writeCarts();
    return deleter;
  }
}

export const cm = new cartsManager("./src/database/carts.json");
