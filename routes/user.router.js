import express from 'express'
import { registerUser, loginUser, trackFitness } from '../controllers/user.controller.js';
import userMiddleware from '../middleware/userMiddleware.js';
import { forgetPass } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/forget', forgetPass)
router.post('/track',  trackFitness)

export default router;
