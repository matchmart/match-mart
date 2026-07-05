import multer from "multer";
const storage = multer.memoryStorage();
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/x-icon", "image/vnd.microsoft.icon"];
export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only image files (jpg, png, webp, ico) are allowed")),
  limits: { fileSize: 5 * 1024 * 1024 },
});
