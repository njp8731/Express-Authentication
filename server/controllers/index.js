let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
const { register } = require('../models/list');

// create the user model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req,res,next)=> {
    res.render("index", {title:"Home"});
}

module.exports.displayAboutPage = (req,res,next)=> {
    res.render( "about",{title:"About"});
}

module.exports.displayServicesPage = (req,res,next)=> {
    res.render("services", {title:"Services"});
}

module.exports.displayProjectsPage = (req,res,next)=> {
    res.render("projects", {title:"Projects"});
}

module.exports.displayContactPage = (req,res,next)=> {
    res.render("contact", {title:"Contact"});
}

module.exports.displayLoginPage = (req,res,next) => {
    // check if the user is already logged in
    if (!req.User) {
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.User ? req.User.displayName: ''
        })
    }else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local', (err,user,info)=> {
        // server error
        if(err) {
            return next(err);
        }
        // user login error
        if(!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error
            if(err) {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req,res,next);
}

module.exports.performLogout = (req,res,next) => {
    req.logout();
    res.redirect('/');
}