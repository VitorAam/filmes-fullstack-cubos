import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { create, list, get, update, remove } from "../controllers/movie.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", list);
router.get("/:id", get);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;