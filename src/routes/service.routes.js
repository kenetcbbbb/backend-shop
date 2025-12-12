import { Router } from "express";
import { getServices, getServiceById } from "../controllers/service.controller.js";

const router = Router();

// Получить список всех сервисов
router.get("/", getServices);

// Получить конкретный сервис по ID
router.get("/:id", getServiceById);

export default router;