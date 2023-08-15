import { userRepository } from "../../../repositories/users.repository.js";

export async function photoUsers(req, res, next) {
  try {
    const user = await userRepository.findOneById(req.params.uid);
    const str = req.files.photo[0].filename;
    user.photo = `../api/assets/profile/${str}`;
    await userRepository.updateOne(user.id, user);
    req["io"].sockets.emit("imageUploaded", user.photo);
    res.status(201).json(req.files.photo);
  } catch (error) {
    next(error);
  }
}
