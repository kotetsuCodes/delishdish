// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var jwt = require('jsonwebtoken');
var settings = require('./config');
var morgan = require('morgan');
var cors = require('cors');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

var port = process.env.PORT || 9090; // set our port

var mongoose = require('mongoose');
mongoose.connect(settings.db); // connect to our database

app.set('superSecret', settings.secret);

// require in mongoose models
var User = require('./app/models/user');

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS,");
  next();
});
*/

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

router.route('/createAccount')

    .post(function (req, res) {
        var user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.recipes = [];

        user.save(function (err, user) {
            if (err) throw err;

            console.log('User Created Successfully');
            res.json({success: true});
        });
    });

router.route('/authenticate')
    .post(function (req, res) {
        console.log('attempting to authenticate');

        // find the user
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                throw err;
            }

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. Email or Password not correct.' });
            } else if (user) {
              // check if password matches
                if (user.password !== req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Email or Password not correct.' });
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({_id: user._id, email: user.email}, app.get('superSecret'), {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON

                    console.log('token successful');

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    });

router.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
        // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
    // if there is no token
    // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.route('/getUser')
    .post(function (req, res) {
        console.log('Retrieving authenticated user');
    });

router.route('/recipe')

    .post(function (req, res) {
        res.json([{ response: 'Recipe Created'}, {recipe: recipe}]);
    })

    // get all recipes for specific users
    .get(function (req, res) {
        User.findOne({email: req.body.email}, function (err, users) {
            res.json(users);
        });
    });

router.route('/recipe/:_id')
    .get(function (req, res) {
        // get single recipe for specific user
    })

    .put(function (req, res) {
        // update a single recipe

    })

    .delete(function (req, res) {
        // remove a single recipe
    });

app.use('/api', router);

server.listen(port);
console.log('DelishDish happens on port ' + port);
