'use strict'; 

const Sequelize = require('sequelize'); 
const { sequelize } = require('../db/sequelize'); 

const Item = sequelize.define('Item', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    }, 
    description: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    street: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    cross_street: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    address: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    city: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    photo_url: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    email: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    phone: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    desired_reply: {
        type: Sequelize.BOOLEAN, 
        allowNull: false
    }, 
    completed: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
    }, 
    date_reported: {
        type: Sequelize.DATE, 
        allowNull: false
    },
    date_completed: {
        type: Sequelize.DATE, 
        allowNull: true
    }
}, {
    tableName: 'items', 
    timestamps: false, 
    underscored: true
}); 

module.exports = { 
    Item
}