import { Sequelize } from "sequelize";

const sequelize = new Sequelize("FitnessData", "root", "Rahul@!123", {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});

sequelize.authenticate()
    .then(result => {
        console.log("Database connected...");
    }).catch(err => {
        console.log(err);
    });

export default sequelize;