let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

// GET route for displaying the Login page
router.get('/login', indexController.displayLoginPage);

// POST route for processing the Login page
router.post('/login', indexController.processLoginPage);

// GET route to perform UserLogout
router.get('/logout', indexController.performLogout);


module.exports = router;
