import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import generateReport from '../api/reportController';

const router = express.Router();

router.get("/report", authMiddleware, generateReport);

export default router;