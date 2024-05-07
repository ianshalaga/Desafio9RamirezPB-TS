import { Router } from "express";
import { productRoute } from "../utils/routes";
import cartController from "../controllers/cart.controller";

const cartsRouter: Router = Router();

/** GET ENDPOINTS */
cartsRouter.get("/", cartController.getAllCarts);
cartsRouter.get("/:cid", cartController.getCartById);

/** POST ENPOINTS */
cartsRouter.post("/", cartController.createCart);
cartsRouter.post(
  "/:cid" + productRoute + "/:pid",
  cartController.addProductToCart
);

/** PUT ENPOINTS */
cartsRouter.put("/:cid", cartController.updateCart);
cartsRouter.put(
  "/:cid" + productRoute + "/:pid",
  cartController.updateProductQuantity
);

/** DELETE ENPOINTS */
cartsRouter.delete(
  "/:cid" + productRoute + "/:pid",
  cartController.removeProductFromCart
);
cartsRouter.delete("/:cid", cartController.clearCart);

export default cartsRouter;
