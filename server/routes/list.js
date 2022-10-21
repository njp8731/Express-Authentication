let express = require('express');
const { isEmptyObject } = require('jquery');
let router = express.Router();
let mongoose = require('mongoose');
const list = require('../models/list');
let passport = require('passport');

let contactController = require('../controllers/contact');

// helper function for guard purposes
function requireAuth(req,res,next) {
    // check 
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// GET route for contact list page

router.get('/', contactController.displayContactList);

// GET route for displaying add page
router.get('/add', requireAuth,contactController. displayAddPage);

// POST route for processing add page
router.post('/add', requireAuth,contactController. processAddPage);

// GET route for displaying edit page
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

// POST route for processing edit page
router.post('/edit/:id', requireAuth, contactController.processEditPage);

// GET route for processing deletion
router.get('/delete/:id', requireAuth, contactController.performDeletion);


module.exports = router;