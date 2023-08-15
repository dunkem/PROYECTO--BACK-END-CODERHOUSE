import { ErrorPermissions } from "../../../models/error/errors.model.js";
import { userRepository } from "../../../repositories/users.repository.js";

export async function deleteOneUserController(req, res, next) {
  req.logger.http("inside delete one user");
  try {
    const user = await userRepository.findOneById(req.params.uid);
    let deleter;
    if (user.role !== "super-admin") {
      deleter = await userRepository.deleteOne(req.params.uid);
    } else {
      throw new ErrorPermissions("you couldent delete super-admin user");
    }
    res.status(200).json(deleter);
  } catch (error) {
    next(error);
  }
}
