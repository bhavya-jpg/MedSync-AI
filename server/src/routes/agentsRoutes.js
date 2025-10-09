import express from 'express';
import medical_model_modelCall  from '../utils/medical_model.js';
import emergency_model_modelCall  from '../utils/emergency_model.js';
import medicine_model_modelCall  from '../utils/medicine_model.js';
import personal_health_model_modelCall  from '../utils/personal_health_model.js';
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/medical', authMiddleware, medical_model_modelCall);
router.post('/emergency', authMiddleware, emergency_model_modelCall);
router.post('/medicine', authMiddleware, medicine_model_modelCall);
router.post('/personal-health', authMiddleware, personal_health_model_modelCall);


export default router;