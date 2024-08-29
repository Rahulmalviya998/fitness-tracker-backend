import express from 'express';
import { getExercises, bookExercise, getUserExercises, addExercise, addMyexercise, fetchMyexercise, exerciseInstruction } from '../controllers/exerciseController.js';
import userMiddleware from '../middleware/userMiddleware.js';

const router = express.Router();

router.get('/', getExercises);
router.post('/addExercise', addExercise)
router.post('/book', bookExercise);
router.get('/myexercises', getUserExercises);
router.post('/addmyexercises', userMiddleware, addMyexercise)
router.get('/getmyexercises', userMiddleware, fetchMyexercise)
router.get('./getinstruction/:id', exerciseInstruction)


export default router;
