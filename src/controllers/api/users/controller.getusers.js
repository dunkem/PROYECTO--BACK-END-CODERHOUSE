import DtoClose from "../../../models/entities/dtoUsers.model.js";
import { userRepository } from "../../../repositories/users.repository.js";

export async function getUsersController(req, res, next) {
  req.logger.http("inside get user");
  try {
    const users = await userRepository.findMany();
    const dtocloseUsers = users.map((usr) => {
      const dtocloseData = new DtoClose(usr).dtoclose();
      return dtocloseData;
    })
    res.json(dtocloseUsers);
  } catch (error) {
    next(error);
  }
}
