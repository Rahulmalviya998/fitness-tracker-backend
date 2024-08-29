import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import User from "./user.model.js";
import Exercise from "./Exercise.js";

const Payment = sequelize.define('Payment', {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    timestamps: true,
});
sequelize.sync()
    .then(result => {
        console.log("user table created....");
    }).catch(err => {
        console.log("Something wrong...");
    })

Payment.belongsTo(User);
Payment.belongsTo(Exercise);

export default Payment;
