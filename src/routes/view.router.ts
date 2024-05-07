import { Router } from "express";
import { productRoute, productsRoute } from "../utils/routes";
import auth from "../middlewares/auth";
import logedin from "../middlewares/logedin";
import viewController from "../controllers/view.controller";

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", viewController.realTimeProducts);
viewsRouter.get("/chat", viewController.chat);
viewsRouter.get(productsRoute, viewController.products);
viewsRouter.get("/carts/:cid", viewController.cart);
viewsRouter.get(`${productRoute}/:pid`, viewController.product);
viewsRouter.get("/register", logedin, viewController.register);
viewsRouter.get("/login", logedin, viewController.login);
viewsRouter.get("/profile", auth, viewController.profile);
viewsRouter.get("/", logedin, viewController.index);

export default viewsRouter;
