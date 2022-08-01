import { Router } from "express";
import { main, task1, task2, task3, task5 } from "../controllers/users.js";
const router = Router();

router.get("/", main);
router.get("/Task1", task1);
router.post("/Task1", task1);
router.get("/Task2", task2);
router.post("/Task2", task2);
router.get("/Task3", task3);
router.post("/Task3", task3);
router.get("/Task5", task5);
router.post("/Task5", task5);
export default router;
