import { socketFn } from "../../../mid/soketio.rt.js";
import { ErrorPermissions } from "../../../models/error/errors.model.js";
import { productsRepository } from "../../../repositories/product.repositorie.js";
import { emailService } from "../../../services/email.service.js";

export async function deleteProduct(req, res, next) {
  req.logger.http("inside delete products");
  try {
    const producto = await productsRepository.findOneById(req.params.pid);
    if (
      req.query.owner !== "super-admin" &&
      producto.owner !== req.query.owner
    ) {
      throw new ErrorPermissions("Product could be edit or delete by owner");
    }
    await productsRepository.deleteOne(req.params.pid);
    if (producto.owner !== "super-admin") {
      const mailData = {
        subject: "Producto eliminado --Astros",
        mensaje: `Hola,\n\n
           Astros le notifica que el producto de su propiedad ${producto.code}, ha sido eliminado.\n\n
          Abrazo de gol\n
          Astros ⭐`,
      };
      await emailService.send(producto.owner, mailData);
    }
    await socketFn();
    res.sendStatus(204);
  } catch (error) {
    req.logger.error(`delete product fail ${error.message}`);
    next(error);
  }
}
