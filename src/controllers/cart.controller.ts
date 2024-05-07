import { Request, Response } from "express";
import cartDbService from "../dao/services/cartDB.service";
import { successStatus, failureStatus } from "../utils/statuses";
// Interfaces
import DbCart from "../interfaces/DbCart";
import ProductCart from "../interfaces/ProductCart";
// Validators
import validateNumber from "../validators/number";
import validateProductCart from "../validators/productCart";

class CartController {
  constructor() {}

  // @@@@
  async getAllCarts(req: Request, res: Response) {
    try {
      const cart: DbCart[] = await cartDbService.getCarts();
      res.status(200).json(cart);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async getCartById(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const cart: DbCart = await cartDbService.getCartById(cid);
      res.status(200).json(cart);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async createCart(req: Request, res: Response) {
    try {
      await cartDbService.createCart();
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async addProductToCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      await cartDbService.addProductToCart(cid, pid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async updateCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const updateProducts: ProductCart[] = validateProductCart(req.body);
      await cartDbService.updateCart(cid, updateProducts);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async updateProductQuantity(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      const quantity: number = validateNumber(req.body);
      await cartDbService.updateProductQuantity(cid, pid, quantity);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async removeProductFromCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      await cartDbService.removeProductFromCart(cid, pid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async clearCart(req: Request, res: Response) {
    try {
      const cid: string = req.params.cid;
      await cartDbService.clearCart(cid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new CartController();
