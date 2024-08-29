import express from 'express'
import cors from "cors"
import bodyParser from 'body-parser';
import userRoutes from './routes/user.router.js';
import exerciseRoutes from './routes/exercise.router.js';
import fileUpload from 'express-fileupload';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(fileUpload({
    useTempFiles: true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/exercises', exerciseRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));