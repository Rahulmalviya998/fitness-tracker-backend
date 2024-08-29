import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
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

export default User;