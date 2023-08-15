import { mmg } from "../../dao/mongoose/messages.dao.mg.js";
import { ticketsRepository } from "../../repositories/ticket.repository.js";
import { productsRepository } from "../../repositories/product.repositorie.js";
import { cartRepository } from "../../repositories/cart.repositrie.js";
import Handlebars from "handlebars";
import jwt from "jsonwebtoken";
import Dtoclose from "../../models/entities/dtoUsers.model.js";

import {
  PATH_NEW_PRODUCT,
  PATH_PRODUCT,
  PATH_CARTS,
  PATH_LOGIN,
  PATH_REGIS,
  PATH_CHAT,
  PATH_TICKET,
  PATH_FORGOT,
  PATH_RECOVER,
  JWT_PRIVATE_KEY,
  PATH_PROFILE,
  PATH_DOCUMENTS,
  PATH_USERS,
} from "../../config/config.js";
import { userRepository } from "../../repositories/users.repository.js";

//helper generado
Handlebars.registerHelper("multiply", function (num1, num2) {
  return num1 * num2;
});

export async function newProductView(req, res, next) {
  try {
    let usrrole;
    let usremail;
    if (req.session.passport) {
      usrrole = req.session.passport.user.role;
      usremail = req.session.passport.user.email;
    } else {
      usrrole = req.user.role;
      usremail = req.user.email;
    }

    if (usrrole === "super-admin") {
      usremail = "super-admin";
    }
    res.render(PATH_NEW_PRODUCT, {
      profile: usremail,
      style: "style-newprod",
      faviconTitle: "Add Products",
      Head: "New Product",
    });
  } catch (error) {
    req.logger.error(`new product error ${error.message}`);
    return next(error.message);
  }
}

export async function productView(req, res, next) {
  try {
    const urlsrt = `https://back-proyecto-final-production-bee0.up.railway.app${req.originalUrl}`;
    const products = await productsRepository.getPaginatedElements(
      req.query,
      urlsrt
    );
    let cartid;
    let usrrole;
    let usremail;

    if (req.session.passport) {
      cartid = req.session.passport.user.cart;
      usrrole = req.session.passport.user.role;
      usremail = req.session.passport.user.email;
    } else {
      cartid = req.user.cart;
      usrrole = req.user.role;
      usremail = req.user.email;
    }
    const usr = await userRepository.findOne({ email: usremail });
    if (usrrole === "super-admin") {
      usremail = "super-admin";
    }
    const validsuperrole = usrrole === "super-admin" ? 1 : 0;
    const validrole = usrrole === "admin" || usrrole === "super-admin" ? 1 : 0;
    const validchat = usrrole === "user" ? 1 : 0;
    const usrid = usr.id;

    res.render(PATH_PRODUCT, {
      superrole: validsuperrole,
      role: validrole,
      chat: validchat,
      uid: usrid,
      cart: cartid,
      style: "style-base",
      faviconTitle: "Home",
      list: products,
      listExist: products.payload.length > 0,
    });
  } catch (error) {
    req.logger.error(`products can't be load ${error.message}`);
    return next(error);
  }
}

export async function cartView(req, res, next) {
  try {
    const products = await cartRepository.getProductsInCartById(req.params.cid);
    res.render(PATH_CARTS, {
      style: "style-cart",
      faviconTitle: "Cart",
      Head: "Cart Shopping",
      list: products,
      listExist: products.length > 0,
      cid: req.params.cid,
    });
  } catch (error) {
    req.logger.error(`invalid cart view${error.message}`);
    return next(error);
  }
}

export async function ticketView(req, res, next) {
  try {
    const ticket = await ticketsRepository.findOne({ code: req.params.tid });
    const products = await cartRepository.getProductsInCartById(req.query.cart);
    await cartRepository.delAllProductsInCart(req.query.cart);
    res.render(PATH_TICKET, {
      style: "style-ticket",
      faviconTitle: "Ticket",
      Head: "Order Success",
      list: products,
      ticket: ticket,
    });
  } catch (error) {
    req.logger.error(`invalid ticket view${error.message}`);
    next(error);
  }
}

export async function loginView(req, res) {
  res.clearCookie("jwt_authorization", {
    signed: true,
    httpOnly: true,
  });
  res.render(PATH_LOGIN, {
    style: "style-login",
    faviconTitle: "Login",
  });
}

export async function regisView(req, res) {
  res.clearCookie("jwt_authorization", {
    signed: true,
    httpOnly: true,
  });
  res.render(PATH_REGIS, {
    style: "style-register",
    faviconTitle: "Regis",
  });
}

export async function chatView(req, res) {
  const mensajes = await mmg.findMsg();
  res.render(PATH_CHAT, {
    faviconTitle: "Chat",
    Head: "Chat",
  });
}

export async function forgotView(req, res) {
  res.render(PATH_FORGOT, {
    style: "style-forgot",
    faviconTitle: "Forgotten password",
  });
}

export async function recoverView(req, res) {
  // Verifica el token
  jwt.verify(req.query.token, JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      req.logger.info(err);
      res.redirect("/login");
    } else {
      res.render(PATH_RECOVER, {
        token: req.query.token,
        style: "style-recover",
        faviconTitle: "Forgotten password",
      });
    }
  });
}

export async function profileView(req, res, next) {
  try {
    const user = await userRepository.findOneById(req.params.uid);
    console.log(user.photo);
    res.render(PATH_PROFILE, {
      uid: req.params.uid,
      style: "style-profile",
      faviconTitle: "My Profile",
      Head: "My Profile",
      profilePhoto: user.photo,
      fullname: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
      lastconnection: user.last_connection,
    });
  } catch (error) {
    req.logger.error(`invalid profile view${error.message}`);
    return next(error);
  }
}

export async function documentsView(req, res, next) {
  try {
    res.render(PATH_DOCUMENTS, {
      uid: req.params.uid,
      style: "style-documents",
      faviconTitle: "My Docs",
      Head: "My Documents",
    });
  } catch (error) {
    req.logger.error(`invalid documents view${error.message}`);
    return next(error);
  }
}

export async function usersView(req, res, next) {
  const usrs = await userRepository.findMany();
  const users = usrs.map((usr) => {
    const dtocloseData = new Dtoclose(usr).dtoclose();
    return dtocloseData;
  });
  try {
    res.render("users", {
      style: "style-users",
      faviconTitle: "Users",
      anyUsers: users.length > 0,
      list: users,
    });
  } catch (error) {
    req.logger.error(`invalid user view${error.message}`);
    return next(error);
  }
}
