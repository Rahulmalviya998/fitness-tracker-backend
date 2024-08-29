import sequelize from "../db/dbConfig.js";
import User from "./user.model.js";
import Exercise from "./Exercise.js";
import Payment from "./payment.js";

const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log('Models synchronized with the database.');
    } catch (err) {
        console.error('Error synchronizing models:', err.message);
    }
};

export default { User, Exercise, Payment, syncModels };
