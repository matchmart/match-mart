import { Router } from "express";
import { createCategory, deleteCategory, getActiveCategories, getAllCategoriesAdmin, getCategoryBySlug, getSingleCategoryAdmin, updateCategory } from "../controllers/categoryController";
import { protect, isAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";
const router=Router();
router.get("/admin/all",protect,isAdmin,getAllCategoriesAdmin); router.get("/admin/:id",protect,isAdmin,getSingleCategoryAdmin);
router.post("/",protect,isAdmin,upload.single("image"),createCategory); router.put("/:id",protect,isAdmin,upload.single("image"),updateCategory); router.delete("/:id",protect,isAdmin,deleteCategory);
router.get("/",getActiveCategories); router.get("/:slug",getCategoryBySlug);
export default router;
