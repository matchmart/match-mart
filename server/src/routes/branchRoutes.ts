import { Router } from "express";
import { createBranch, deleteBranch, getActiveBranches, getAllBranchesAdmin, getBranchBySlug, getSingleBranchAdmin, updateBranch } from "../controllers/branchController";
import { protect, isAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";
const router=Router();
router.get("/admin/all",protect,isAdmin,getAllBranchesAdmin); router.get("/admin/:id",protect,isAdmin,getSingleBranchAdmin);
router.post("/",protect,isAdmin,upload.array("images",5),createBranch); router.put("/:id",protect,isAdmin,upload.array("images",5),updateBranch); router.delete("/:id",protect,isAdmin,deleteBranch);
router.get("/",getActiveBranches); router.get("/:slug",getBranchBySlug);
export default router;
