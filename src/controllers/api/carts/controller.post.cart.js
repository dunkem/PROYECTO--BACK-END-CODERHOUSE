import Carts from "../../../models/entities/Carts.model.js";
import { cartRepository } from "../../../repositories/cart.repositrie.js";

export async function postCart(req, res, next) {
  req.logger.http("inside post a cart");
  try {
    const newcart = new Carts();
    const cart = await cartRepository.add(newcart.dto());
    res.json(cart);
  } catch (error) {
    req.logger.error(`post cart fail ${error.message}`);
    next(error);
  }
}
