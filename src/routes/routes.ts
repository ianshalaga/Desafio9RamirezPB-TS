import { Router } from "express";

// Routers
import productsRouter from "./products.router";
import cartsRouter from "./carts.router";
import sessionsRouter from "./sessions.router";
import viewsRouter from "./views.router";

import {
  apiRoute,
  productsRoute,
  cartsRoute,
  sessionsRoute,
} from "../utils/routes";

const routes = Router();

routes.use(apiRoute + productsRoute, productsRouter); // API Products
routes.use(apiRoute + cartsRoute, cartsRouter); // API Carts
routes.use(apiRoute + sessionsRoute, sessionsRouter); // API Sessions
routes.use(viewsRouter); // Views

export default routes;
