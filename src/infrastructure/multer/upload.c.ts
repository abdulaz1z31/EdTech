import { Router, Request, Response } from "express";
import { UploadService } from "./upload.service";

const router = Router();

// 📌 **Bitta fayl yuklash**
router.post(
  "/upload/file",
  UploadService.uploadSingleFile,
  (req: Request, res: Response) => {
    if (!req.file)
      return res.status(400).json({ message: "❌ No file uploaded!" });

    res.json({
      message: "✅ File uploaded successfully!",
      filename: req.file.filename,
    });
  },
);

// 📌 **Bir nechta fayl yuklash**
router.post(
  "/upload/files",
  UploadService.uploadMultipleFiles,
  (req: Request, res: Response) => {
    if (!req.files)
      return res.status(400).json({ message: "❌ No files uploaded!" });

    const filenames = (req.files as Express.Multer.File[]).map(
      (file) => file.filename,
    );
    res.json({
      message: "✅ Files uploaded successfully!",
      filenames,
    });
  },
);

// 📌 **Bitta video yuklash**
router.post(
  "/upload/video",
  UploadService.uploadSingleVideo,
  (req: Request, res: Response) => {
    if (!req.file)
      return res.status(400).json({ message: "❌ No video uploaded!" });

    res.json({
      message: "✅ Video uploaded successfully!",
      filename: req.file.filename,
    });
  },
);

// 📌 **Bir nechta video yuklash**
router.post(
  "/upload/videos",
  UploadService.uploadMultipleVideos,
  (req: Request, res: Response) => {
    if (!req.files)
      return res.status(400).json({ message: "❌ No videos uploaded!" });

    const filenames = (req.files as Express.Multer.File[]).map(
      (file) => file.filename,
    );
    res.json({
      message: "✅ Videos uploaded successfully!",
      filenames,
    });
  },
);

export default router;
