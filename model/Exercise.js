import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import User from "./user.model.js";
// import MyExercise from "./MyExercise.js";

const Exercise = sequelize.define('Exercise', {
    //     name: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //     },
    //     instructions: {
    //         type: DataTypes.TEXT,
    //         allowNull: false,
    //     },
    //     duration: {
    //         type: DataTypes.INTEGER,
    //         allowNull: false,
    //     },
    //     image: {
    //         type: DataTypes.STRING,
    //         allowNull: true
    //     }
    // }, {
    //     timestamps: true,

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bodyParts: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }




});
sequelize.sync()
    .then(result => {
        console.log("user table created....");
    }).catch(err => {
        console.log("Something wrong...");
    })


// Exercise.belongsToMany(User, { through: 'myExercises' });
// User.belongsToMany(Exercise, { through: 'UserExercises' });

export default Exercise;
