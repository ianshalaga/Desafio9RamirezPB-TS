import { Router } from "express";
import productController from "../controllers/product.controller";

const productsRouter: Router = Router();

/** GET ENDPOINTS */
productsRouter.get("/", productController.getAllProducts);
productsRouter.get("/:pid", productController.getProductById);

/** POST ENDPOINT */
productsRouter.post("/", productController.addProduct);

/** PUT ENDPOINT */
productsRouter.put("/:pid", productController.updateProduct);

/** DELETE ENDPOINT */
productsRouter.delete("/:pid", productController.deleteProduct);

export default productsRouter;
