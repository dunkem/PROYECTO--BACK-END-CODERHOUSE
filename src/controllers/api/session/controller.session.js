import { formatDate } from "../../../mid/dateformater.js";
import { userRepository } from "../../../repositories/users.repository.js";
import { encriptarJWT } from "../../../utils/cripto.js";

export function getCurrentSessionController(req, res, next) {
  req.logger.http("inside get current sessions");
  try {
    const userws = userRepository.findMany();
    res.json(userws);
  } catch (error) {
    next(error);
  }
}

export async function postSesiones(req, res, next) {
  req.logger.http("inside post session");
  try {
    const usrLoged = await userRepository.findOne({ email: req.user.email });
    usrLoged.last_connection = formatDate(new Date());
    await userRepository.updateOne(usrLoged.id, usrLoged);
    res.cookie("jwt_authorization", encriptarJWT(req.user), {
      signed: true,
      httpOnly: true,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export async function deleteSesiones(req, res, next) {
  req.logger.http("inside delete session");
  try {
    const usr = req.session.user || req.session.passport.user;
    const usrLoged = await userRepository.findOne({
      email: usr.email,
    });
    usrLoged.last_connection = formatDate(new Date());
    await userRepository.updateOne(usrLoged.id, usrLoged);
    req.logout(async (err) => {
      res.clearCookie("jwt_authorization", {
        signed: true,
        httpOnly: true,
      });
      res.sendStatus(200);
    });
  } catch (error) {
    next(error);
  }
}
