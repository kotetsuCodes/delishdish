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
// require in mongoose models
var User = require('./models/user');
var Recipe = require('./models/recipe');
var ShoppingList = require('./models/shoppinglist');
var Ingredient = require('./models/ingredient');
var QuantityType = require('./models/quantity_type');

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

// router.use(function (req, res, next) {
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];

//   // decode token
//     if (token) {
//     // verifies secret and checks exp
//         jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//         // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//     // if there is no token
//     // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// });

router.route('/getUser')
    .post(function (req, res) {
        console.log('Retrieving authenticated user');
    });

router.route('/shoppinglists')
    .get(function (req, res) {
        ShoppingList.find({email: 'test@test.com'}, function (err, shoppinglists) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json(shoppinglists);
        });
    })
    .post(function (req, res) {
        var shoppinglist = new ShoppingList();

        shoppinglist.email = 'test@test.com';
        shoppinglist.name = req.body.name;
        shoppinglist.recipes = req.body.recipes;

        shoppinglist.save(function (err, shoppinglist) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json({success: true});
        });
    });

router.route('/shoppinglists/:id')
    .get(function (req, res) {
        ShoppingList.findOne({email: 'test@test.com', _id: req.params.id}, function (err, shoppinglistResult) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }
            if (shoppinglistResult == null) {
                return res.status(404).send({
                    success: false,
                    message: 'Shopping List Not Found'
                });
            }

            res.json(shoppinglistResult);
        });
    })
    .put(function (req, res) {
        ShoppingList.findOneAndUpdate({email: 'test@test.com', _id: req.params.id}, req.body, function (err, originalShoppingList) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json(originalShoppingList);
        });
    })
    .delete(function (req, res) {
        ShoppingList.findOneAndRemove({email: 'test@test.com', _id: req.params.id}, function (err, originalShoppingList) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json(originalShoppingList);
        });
    });

router.route('/recipes')
    // get all recipes for specific users
    .get(function (req, res) {
        Recipe.find({email: 'test@test.com'}, function (err, recipes) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json(recipes);
        });
    })
    // add a recipe
    .post(function (req, res) {
        var newRecipe = new Recipe();

        newRecipe.email = 'test@test.com';
        newRecipe.name = req.body.name;
        newRecipe.ingredients = req.body.ingredients;

        newRecipe.save(function (err, newRecipe) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json({success: true});
        });
    });

router.route('/recipes/:id')
    // get single recipe for specific user
    .get(function (req, res) {
        Recipe.findOne({email: 'test@test.com', _id: req.params.id}, function (err, recipeResult) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }
            if (recipeResult == null) {
                return res.status(404).send({
                    success: false,
                    message: 'Recipe Not Found'
                });
            }

            res.json(recipeResult);
        });
    })
    // update a single recipe
    .put(function (req, res) {
        Recipe.findOneAndUpdate({email: 'test@test.com', _id: req.params.id}, req.body, function (err, originalRecipe) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json(originalRecipe);
        });
    })
    // remove a single recipe
    .delete(function (req, res) {
        Recipe.findOneAndRemove({email: 'test@test.com', _id: req.params.id}, function (err, originalRecipe) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json(originalRecipe);
        });
    });

router.route('/ingredients')
    .get(function (req, res) {
        Ingredient.find({}, function (err, ingredientResult) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }
            res.json(ingredientResult);
        });
    })
    .post(function (req, res) {
        var newIngredient = new Ingredient();

        newIngredient.name = req.body.name;

        newIngredient.save(function (err, newIngredient) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json({success: true});
        });
    });

router.route('/quantityTypes')
    .get(function (req, res) {
        QuantityType.find({}, function (err, quantityTypeResult) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }
            res.json(quantityTypeResult);
        });
    })
    .post(function (req, res) {
        var newQuantityType = new QuantityType();

        newQuantityType.name = req.body.name;

        newQuantityType.save(function (err, newQuantityType) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Unexpected error occurred.'
                });
            }

            res.json({success: true});
        });
    });

app.use('/api', router);

server.listen(port);
console.log('DelishDish happens on port ' + port);
