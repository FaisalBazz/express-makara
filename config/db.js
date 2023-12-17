const sequelize = require('sequelize');
const getConnect = require('./config.json');

const db = new sequelize(
    getConnect.database,
    getConnect.username,
    getConnect.password,{
        host: getConnect.host, 
        dialect: getConnect.dialect
    }
)

db.sync({})

module.exports = db