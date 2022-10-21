let express = require('express');
let router = express.Router();

let List =  require('../models/list');
let mongoose = require('mongoose');

module.exports.displayContactList = (req,res,next) => {
    List.find((err, ContactList) => {
        if(err) {
            return console.error(err);
        }
        else {
            res.render('list/contactList', {title: "Contacts", ContactList: ContactList});
        }
    });
}

module.exports.displayAddPage = (req,res,next)=>{
    res.render('list/add', {title: "Add Contact"});
}

module.exports.processAddPage = (req,res,next)=>{
    let newContact = list({
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.password
    });
    List.create(newContact, (err, list)=>{
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contact-list');
        }
    });
}

module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;
    
    List.findById(id, (err, currentContact)=>{
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('list/edit', {title:"Edit Contact", contact: currentContact});
        }
    })
}

module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id;

    let updatedContact = list({
        "_id": id,
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.password
    });
    List.updateOne({_id: id}, updatedContact, (err)=> {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect("/contact-list");
        }
    });
}

module.exports.performDeletion = (req,res,next)=>{
    let id = req.params.id;
    List.remove({_id:id}, (err)=> {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect("/contact-list");
        }
    });
}