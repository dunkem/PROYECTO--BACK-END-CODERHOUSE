import { Router } from "express";
import { postUsuarios } from "../../controllers/api/users/controller.post.users.js";
import { getUsersController } from "../../controllers/api/users/controller.getusers.js";
import { authJwtApi } from "../../mid/authentication.js";
import { soloRol } from "../../mid/authorization.js";
import { postUsersForgot } from "../../controllers/api/users/controller.postusersforgot.js";
import { postUsersRecover } from "../../controllers/api/users/controller.postusersrecover.js";
import { getUsersAdm } from "../../controllers/api/users/controller.getuseradm.js";
import { docsUsers } from "../../controllers/api/users/controller.post.docsusers.js";
import { extractorMulter } from "../../mid/extractor.js";
import { photoUsers } from "../../controllers/api/users/controller.post.photousers.js";
import { docCheck } from "../../mid/doccheck.js";
import { deleteOneUserController } from "../../controllers/api/users/controller.deleteoneusers.js";
import { deleteAllUserController } from "../../controllers/api/users/controller.deleteallusers.js";

export const usersRouter = Router();

//creacion
usersRouter.post("/", postUsuarios);
//obtener todos api
usersRouter.get("/", authJwtApi, soloRol("super-admin"), getUsersController);

//recupero password
usersRouter.post("/forgot", postUsersForgot);
usersRouter.post("/recover", postUsersRecover);

//cambio de rol
usersRouter.get("/admin/:uid", authJwtApi, soloRol("super-admin"), getUsersAdm);

//extrae docs
usersRouter.post(
  "/documents/:uid",
  docCheck,
  extractorMulter("assets/documents", [
    { name: "identificator" },
    { name: "address" },
    { name: "status" },
  ]),
  docsUsers
);
//extrae photo
usersRouter.post(
  "/profile/:uid",
  extractorMulter("assets/profile", [{ name: "photo" }]),
  photoUsers
);

//borrar uno
usersRouter.delete(
  "/:uid",
  authJwtApi,
  soloRol("super-admin"),
  deleteOneUserController
);

//borrar por inactivida
usersRouter.delete(
  "/",
  authJwtApi,
  soloRol("super-admin"),
  deleteAllUserController
);
