import Exercise from '../model/Exercise.js'
import Payment from '../model/payment.js'
import { v2 as cloudinary } from "cloudinary";
import MyExercise from '../model/MyExercise.js';
import razorpay from '../db/razorpay.js';


// export const getExercises = async (req, res) => {
//     try {
//         const exercises = await Exercise.findAll();
//         res.status(200).json(exercises);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.findAll();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exercises' });
    }
};//this is new api

// export const bookExercise = async (req, res) => {
//     console.log(req.user, "users")
//     const { ExerciseId, amount } = req.body;
//     const UserId = req.user.id;
//     console.log(req.user.id)

//     try {
//         const exercise = await Exercise.findByPk(ExerciseId);
//         if (!exercise)
//             return res.status(404).json({ message: 'Exercise not found' });

//         const payment = await Payment.create({ UserId, ExerciseId, amount, status: 'paid' });
//         return res.status(201).json(payment);


//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

export const bookExercise = async (req, res) => {
    const { amount } = req.body;
    try {
        const order = await razorpay.orders.create({
            amount,
            currency: 'INR',
            receipt: 'order_rcptid_11',
        });
        res.json({ order });
    } catch (error) {
        res.status(500).json({ error: 'Error creating Razorpay order' });
    }
};//this is new api



export const getUserExercises = async (req, res) => {
    // console.log(req.user)
    try {
        const userId = req.user.id;
        const payments = await Payment.findAll({ include: { model: Exercise }, where: { userId, status: 'paid' }, raw: true, nest: true });
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

cloudinary.config({
    cloud_name: 'dmgwkmrlk',
    api_key: '587571655869224',
    api_secret: '5v-9ZEWHjnvT2mWXBEYgroPvqEc'
});
export const addExercise = async (req, res) => {
    const file = req.files.image;
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
    console.log(uploadResult)

    const { title, description, bodyParts, price } = req.body;


    try {
        const addExercise = await Exercise.create({ title, description, imageUrl: uploadResult.url, price, bodyParts });
        return res.status(201).json({ message: "exercise added successfully", addExercise });
    } catch (err) {
        return res.status(500).json({ error: err.message })

    }
}
export const addMyexercise = async (req, res) => {
    const userId = req.user.id;
    console.log(req.user.id)
    const { exerciseId, razorpayPaymentId } = req.body;
    try {
        const myExercise = await MyExercise.create({ exerciseId, razorpayPaymentId, userId });
        res.json(myExercise);
        console.log(myExercise);

    } catch (error) {
        res.status(500).json({ error: 'Error adding exercise to My Exercises' });
    }
};//this is new api

// export const fetchMyexercise = async (req, res) => {
//     try {
//         const myExercises = await MyExercise.findAll({ include: Exercise });
//         res.json(myExercises);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching My Exercises' });
//     }
// };
// export const fetchMyexercise = async (req, res) => {
//     try {
//         const myExercises = await MyExercise.findAll({
//             include: {
//                 model: Exercise,
//                 attributes: ['id', 'title', 'imageUrl', 'bodyParts', 'description', 'price']
//             }
//         });
//         res.json(myExercises);
//     } catch (error) {
//         console.error('Error fetching My Exercises:', error);
//         res.status(500).json({ error: 'Error fetching My Exercises' });
//     }
// };
export const fetchMyexercise = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in the request
        const myExercises = await MyExercise.findAll({
            where: { userId },
            include: {
                model: Exercise,
                attributes: ['id', 'title', 'imageUrl', 'bodyParts', 'description', 'price']
            }
        });
        res.json(myExercises);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching My Exercises' });
    }
};

export const exerciseInstruction = async (req, res) => {
    // Mock instructions, should ideally fetch from DB
    const instructions = [
        { id: 1, text: 'Warm up for 10 minutes' },
        { id: 2, text: 'Do 3 sets of 15 push-ups' },
        { id: 3, text: 'Cool down and stretch' },
    ];
    res.json(instructions);
};
