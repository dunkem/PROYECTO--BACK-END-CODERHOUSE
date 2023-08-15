import { io } from "../app/server.js";
import { productsRepository } from "../repositories/product.repositorie.js";

export async function socketFn(req, res, next) {
  const products = await productsRepository.findMany();
  console.log(products);
  io.emit("reloadProducts", {
    list: products,
    listOk: products.length > 0,
  });
}
