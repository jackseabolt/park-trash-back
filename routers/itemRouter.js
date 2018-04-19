'use strict'; 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); 
const { Item } = require('../models/item'); 
const router = express.Router(); 


// GET ALL ITEMS
router.get('/', jsonParser, (req, res) => {
    return Item
        .findAll()
        .then(items => {
            res.status(200).json({ items })
        })
        .catch(err => {
            res.sendStatus(500); 
        }); 
}); 

// GET ITEMS BY CITY 
router.get('/city/:city', jsonParser, (req, res) => {
    return Item
        .findAll({where: { city: req.params.city}})
        .then(items => {
            res.status(200).json({ items })
        })
        .catch(err => {
            res.sendStatus(500); 
        }); 
}); 

// CREATE A NEW ITEM
router.post('/new', jsonParser, (req, res) => {
    let phone = req.body.phone ? req.body.phone : null; 
    let description = req.body.description.toLowerCase(); 
    let street = req.body.street.toLowerCase(); 
    let city = req.body.city.toLowerCase();

    return Item
        .create({
            description, 
            street, 
            city, 
            desired_reply: req.body.desired_reply,
            phone,
            completed: false,  
            date_reported: Date.now(), 
        })
        .then(item => {
            res.status(201).json({ item })
        })
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        });
}); 

// DELETE ALL CHECKED 
router.delete('/delete/completed', (req, res) => {
    return Item
        .destroy({ where: { completed: true }})
        .then(() => {
            res.status(204).json({ message: 'All checked items removed'})
        })
        .catch(err => {
            res.sendStatus(500); 
        })
}); 

// DELETE ITEM
router.delete('/delete/:id', (req, res) => {
    return Item
        .destroy({ where: { id: req.params.id }})
        .then((response) => {
            if(!response) {
                return res.status(404).json({ message: 'Value does not exist'});                 
            }
            res.status(204).json({ message: 'The record was removed'})
        })
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        }); 
}); 

// CHECK ITEM
router.put('/check/:id', (req, res) => {
    return Item 
        .update({ completed: true, date_completed: Date.now() }, 
            { where: { id: req.params.id}})
        .then(item => {
            res.status(204).json({ item })
        })
        .catch(err => {
            res.sendStatus(500); 
        }); 
}); 

// UPDATE ITEM
router.put('/update/:id', jsonParser, (req, res) => {
    let data; 
    Item 
        .find({ where: { id: req.params.id}})
        .then(data => {
            let newDescription = req.body.description ? req.body.description : data.description; 
            let newStreet = req.body.street ? req.body.street : data.street;
            let newCrossStreet = req.body.cross_street ? req.body.cross_street : data.cross_street; 
            let newAddress = req.body.address ? req.body.address : data.address;
            let newCity = req.body.city ? req.body.city : data.city; 
            let newEmail = req.body.email ? req.body.email : data.email;
            let newPhone = req.body.phone ? req.body.phone : data.phone; 
            return Item 
                .update({ 
                    description: newDescription, 
                    street: newStreet, 
                    cross_street: newCrossStreet, 
                    address: newAddress, 
                    city: newCity, 
                    email: newEmail, 
                    phone: newPhone
                 }, { where: { id: req.params.id }})
                 .then(item => {
                     res.status(204).json({ item })
                 })
                 .catch(err => {
                     console.error(err)
                     res.status(500).json({ message: 'There was a problem' }); 
                 })
        })
        .catch(err => {
            res.status(400).json({ message: 'No record was found' }); 
        }); 
});



module.exports = { router }