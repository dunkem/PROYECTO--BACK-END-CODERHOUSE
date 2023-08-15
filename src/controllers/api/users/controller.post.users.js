import { encriptarJWT } from "../../../utils/cripto.js";
import { userService } from "../../../services/users.service.js";
import { emailService } from "../../../services/email.service.js";

export async function postUsuarios(req, res, next) {
  req.logger.http("inside post user");
  try {
    const userCreated = await userService.registrar(req.body);
    req.session.user = userCreated;
    res.cookie("jwt_authorization", encriptarJWT(userCreated), {
      signed: true,
      httpOnly: true,
    });
    const mailData = {
      subject: "Bienvenido a Astros",
      mensaje: `Hola,\n\n
        Gracias por elegir Astros, nos enorgullese que formes parte de nuestra familia Astromanníaca.Tu usuario ya se encuentra creado, que disfrutres tu pase por nuestra tienda virtual\n\n
        Saludos,\n
        Astros ⭐`,
    };
    await emailService.send(userCreated.email, mailData);

    res.status(201).json(userCreated);
  } catch (error) {
    req.logger.error(`post user fail ${error.message}`);
    next(error);
  }
}
