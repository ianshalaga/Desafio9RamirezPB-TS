import { Request, Response } from "express";
import productDbService from "../dao/services/productDB.service";
import { successStatus, failureStatus } from "../utils/statuses";
// Interfaces
import QueryParams from "../interfaces/QueryParams";
import GetProduct from "../interfaces/GetProduct";
import Product from "../interfaces/Product";
import UpdateProduct from "../interfaces/UpdateProduct";
// Validators
import validateQueryParams from "../validators/queryParams";
import validateUpdateProduct from "../validators/updateProduct";

class ProductController {
  constructor() {}

  // @@@@
  async getAllProducts(req: Request, res: Response) {
    try {
      let limitParsed: number = 10;
      let pageParsed: number = 1;
      const queryParams: QueryParams = validateQueryParams(req.query);
      const { limit, page, sort, query } = queryParams;
      // @@@@ Pendiente: Validar que el parseo a entero de limit y page de un número válido.
      if (limit) {
        limitParsed = parseInt(limit);
      }
      if (page) {
        pageParsed = parseInt(page);
      }
      const products: GetProduct = await productDbService.getProducts(
        limitParsed,
        pageParsed,
        sort,
        query
      );
      res.status(200).json(products);
    } catch (error) {
      const products: GetProduct = {
        status: "error",
        payload: [],
        totalPages: 0,
        prevPage: null,
        nextPage: null,
        page: 0,
        hasPrevPage: false,
        hasNextPage: false,
      };
      res.status(500).json(products);
    }
  }

  // @@@@
  async getProductById(req: Request, res: Response) {
    try {
      const pid: string = req.params.pid;
      const product = await productDbService.getProductById(pid);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json(failureStatus(error.message));
    }
  }

  // @@@@
  async addProduct(req: Request, res: Response) {
    try {
      const product: Product = req.body;
      await productDbService.addProduct(product);
      res.status(200).json(successStatus);
    } catch (error) {
      res.status(500).json(failureStatus(error.message));
    }
  }

  // @@@@
  async updateProduct(req: Request, res: Response) {
    try {
      const pid: string = req.params.pid;
      const updateProperties: UpdateProduct = validateUpdateProduct(req.body);
      await productDbService.updateProduct(pid, updateProperties);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async deleteProduct(req: Request, res: Response) {
    try {
      const pid: string = req.params.pid;
      await productDbService.deleteProduct(pid);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new ProductController();
