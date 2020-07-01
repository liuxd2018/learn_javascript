import { Router } from "./deps.ts";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.ts";

export const router = new Router();

router.get("/api/v1/products", getProducts)
  .get("/api/v1/products/:id", getProduct)
  .post("/api/v1/products", addProduct)
  .put("/api/v1/products/:id", updateProduct)
  .delete("/api/v1/products/:id", deleteProduct);
