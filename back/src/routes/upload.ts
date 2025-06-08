import express, { Request, Response } from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { sanitizeFileName } from "../utils/sanitizeFileName";

dotenv.config();

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

uploadRouter.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }

        const fileKey = `previews/${uuidv4()}-${sanitizeFileName(file.originalname)}`;

        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET!,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await s3.send(command);

        const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;

        return res.status(200).json({ url: publicUrl });
    } catch (error) {
        console.error("Erro no upload:", error);
        res.status(500).json({ error: "Erro ao enviar arquivo." });
    }
});

export default uploadRouter;
