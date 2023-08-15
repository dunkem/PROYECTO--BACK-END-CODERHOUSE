import { userRepository } from "../../../repositories/users.repository.js";

export async function docsUsers(req, res, next) {
  try {
    const files = req.files;
    const resultArray = Object.keys(files).map((fieldName) => {
      return {
        name: fieldName,
        reference: files[fieldName][0].path,
      };
    });
    const user = await userRepository.findOneById(req.params.uid);
    user.documents = resultArray;
    await userRepository.updateOne(user.id, user);
    res.status(201).json(resultArray);
  } catch (error) {
    next(error);
  }
}
