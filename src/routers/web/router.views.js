import { Router } from "express";
import {
  cartView,
  chatView,
  documentsView,
  forgotView,
  loginView,
  newProductView,
  productView,
  profileView,
  recoverView,
  regisView,
  ticketView,
  usersView,
} from "../../controllers/views/controller.all.views.js";
import { authJwtView } from "../../mid/authentication.js";
import { soloRol } from "../../mid/authorization.js";

export const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  res.redirect("/login");
});

viewsRouter.get("/newproducts", authJwtView, soloRol("admin"), newProductView);

//vistas de productos paginado
//nota falta ver como hacer para que siempre aparezca en mi url page como req (ver como redirigir)
viewsRouter.get("/products", authJwtView, productView);

//vista de carritos
viewsRouter.get("/carts/:cid", authJwtView, cartView);

//Login
viewsRouter.get("/login", loginView);

//Register
viewsRouter.get("/register", regisView);

//Chat
viewsRouter.get("/chat", soloRol("user"), chatView);

//Ticket

viewsRouter.get("/ticket/:tid", authJwtView, ticketView);

// Forgot password

viewsRouter.get("/forgot", forgotView);

//recover passwors

viewsRouter.get("/recover", recoverView);

//profile view

viewsRouter.get("/profile/:uid", authJwtView, profileView);

//documents view

viewsRouter.get("/documents/:uid", authJwtView, documentsView);

//getusers view

viewsRouter.get("/users", authJwtView, usersView);
