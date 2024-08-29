import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, email, password, age, weight } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, age, weight });
        res.status(201).json({ message: 'sign in success', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
        const tokenKey = "rahulmalviya";

        const token = jwt.sign({ id: user.id}, tokenKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const trackFitness = (req, res) => {

    const { age, weight, height } = req.body;
    if (height <= 0 || weight <= 0 || age <= 0) {
        return res.status(400).json({ message: 'Please fill the positive values' });
    };

    const bmi = (weight / ((height * 0.3048) * (height * 0.3048))).toFixed(2);;
    console.log(bmi)
    if (bmi < 18.5) {
        return res.status(200).json({ message: 'You are underweight and unfit', bmi })
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return res.status(200).json({ message: 'Your weight is normal and you are fit', bmi })
    } else if (bmi >= 25 && bmi < 29.9) {

        return res.status(200).json({ message: 'You are Overweight and Unfit', bmi })
    } else {

        return res.status(200).json({ message: 'Your weight is High please appoint a docter', bmi })
    }




}
export const forgetPass = async (request, response, next) => {
    let { email, password } = request.body;
    try {
        let result = await User.findOne({ where: { email }, raw: true });
        console.log(password)
        const hashedPass = await bcrypt.hash(password, 10);
        if (result)
            return User.update(
                { password: hashedPass },
                { where: { email } }
            ) ? response.status(200).json({ message: 'update success', result }) : response.status(401).json({ error: "Bad request | Invalid Email" });

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error2" });
    }
}