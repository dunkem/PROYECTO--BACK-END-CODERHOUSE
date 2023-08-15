import { ErrorDuplicatedElement } from "../models/error/errors.model.js";
import { userRepository } from "../repositories/users.repository.js";

export async function docCheck(req, res, next) {
  try {
    const user = await userRepository.findOneById(req.params.uid);
    if (user.documents.length > 0)
      throw new ErrorDuplicatedElement("documents is not empty");
  } catch (error) {
    next(error);
  }
  next();
}
