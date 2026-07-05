import { Router } from "express";
import { createProduct, deleteProduct, getActiveProducts, getAllProductsAdmin, getProductBySlug, getSingleProductAdmin, updateProduct } from "../controllers/productController";
import { protect, isAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";
const router=Router();
router.get("/admin/all",protect,isAdmin,getAllProductsAdmin); router.get("/admin/:id",protect,isAdmin,getSingleProductAdmin);
router.post("/",protect,isAdmin,upload.array("images",5),createProduct); router.put("/:id",protect,isAdmin,upload.array("images",5),updateProduct); router.delete("/:id",protect,isAdmin,deleteProduct);
router.get("/",getActiveProducts); router.get("/:slug",getProductBySlug);
export default router;
