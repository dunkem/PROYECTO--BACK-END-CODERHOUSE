import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function getProductsController(req, res, next) {
  req.logger.http("inside get products");
  if (process.env.PERSISTENCIA === "mongoose") {
    try {
      const urlsrt = `https://back-proyecto-final-production-bee0.up.railway.app${req.originalUrl}`;
      const result = await productsRepository.getPaginatedElements(
        req.query,
        urlsrt
      );
      res.json(result);
    } catch (error) {
      req.logger.error(`get all products fail ${error.message}`);
      next(error);
    }
  } else {
    try {
      const result = await productsRepository.findMany();
      res.json(result);
    } catch (error) {
      req.logger.error(`get all products fail ${error.message}`);
      next(error);
    }
  }
}
