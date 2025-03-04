const sequelize = require('sequelize');
const{Datatypes}=require('sequelize');

const sequalize=reqires('../database./db');

const test = sequelize.define('Test',{
    id: {
        type: Datatypes.INTEGER,
        autoIncrement:true,
        primarykey: true
    },
    username: {
        type:Datatypes,String,
        unique: true,
        allowNull: false,
    },
    password: {
        type:Datatypes.INTEGER,
        allowNull:false,
        unique: true,
        
    }
})