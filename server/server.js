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
mongoose.Promise = global.Promise;
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

    user.save(function (err, user) {
        if (err) throw err;

        console.log('User Created Successfully');
        res.json({success: true});
    });
});

router.route('/login')
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
                res.status(401).send({ success: false, message: 'Authentication failed. Email or Password not correct.' });
            } else if (user) {
              // check if password matches
              if (user.password !== req.body.password) {
                res.status(401).send({ success: false, message: 'Authentication failed. Email or Password not correct.' });
            } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({_id: user._id, email: user.email}, app.get('superSecret'), {
                        expiresIn: 86400 // expires in 24 hours
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

//runs on every request
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    // decode token
    if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        }
    });
} else {

    // if there is no token
    // return an error
    return res.status(401).send({
        success: false,
        message: 'No token provided.'
    });

}
});

router.route('/shoppinglists')
.get(function (req, res) {

    ShoppingList.find({email: req.decoded.email}).populate('recipeIds').exec(function(err, shoppinglists) {
    // list of cars with partIds populated
    console.log(shoppinglists);
    res.json(shoppinglists);
    });


    // let shoppingListPromise = ShoppingList.find({email: req.decoded.email}).exec();
    // shoppingListPromise.then(function(err, shoppinglist) {
    //     let recipePromise = Recipe.find({'_id': { $in: shoppinglist.recipes}}).exec();
    //         recipePromise.then(function(recipe) {
    //             console.log(`recipe: ${recipe}`);
    //             shoppinglist.recipes = recipe;
    //             console.log(shoppinglist.recipes);
    //         });
    // });

    // ShoppingList.find({email: req.decoded.email}, function (err, shoppinglists) {
    //     if (err) {
    //         return res.status(500).send({
    //             success: false,
    //             message: 'Unexpected error occurred.'
    //         });
    //     }

    //     let shoppinglistCollection = [];

    //     for(var i = 0; i < shoppinglists.length; i++) {
    //         console.log(`i: ${i}`);
    //         shoppinglistCollection.push({_id: shoppinglists[i]._id, email: shoppinglists[i].email, name: shoppinglists[i].name, recipes: []});

    //         let recipePromise = Recipe.find({'_id': { $in: shoppinglists[i].recipes}}).exec();
    //         recipePromise.then(function(recipe) {
    //             console.log(`recipe: ${recipe}`);
    //             shoppinglistCollection[i].recipes.push(recipe);
    //         });
    //     }
    //     console.log(`shoppinglistCollection: ${shoppinglistCollection.recipes}`);
    //     //console.log(shoppinglists[0].recipes);
    //     res.json(shoppinglistCollection);
    // });
})
.post(function (req, res) {
    var shoppinglist = new ShoppingList();

    shoppinglist.email = req.decoded.email;
    shoppinglist.name = req.body.name;
    shoppinglist.recipeIds = req.body.recipeIds;

    shoppinglist.save(function (err, shoppinglist) {
        if (err) {
            console.log(err);
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
    ShoppingList.findOne({email: req.decoded.email, _id: req.params.id}).populate('recipeIds').exec(function (err, shoppinglist) {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Unexpected error occurred.'
            });
        }
        if (shoppinglist == null) {
            return res.status(404).send({
                success: false,
                message: 'Shopping List Not Found'
            });
        }

        res.json(shoppinglist);
    });
})
.put(function (req, res) {
    ShoppingList.findOneAndUpdate({email: req.decoded.email, _id: req.params.id}, req.body, function (err, originalShoppingList) {
        console.log(err);
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
    ShoppingList.findOneAndRemove({email: req.decoded.email, _id: req.params.id}, function (err, originalShoppingList) {
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
        Recipe.find({email: req.decoded.email}, function (err, recipes) {
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

        newRecipe.email = req.decoded.email;
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
        Recipe.findOne({email: req.decoded.email, _id: req.params.id}, function (err, recipeResult) {
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
        Recipe.findOneAndUpdate({email: req.decoded.email, _id: req.params.id}, req.body, function (err, originalRecipe) {
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
        Recipe.findOneAndRemove({email: req.decoded.email, _id: req.params.id}, function (err, originalRecipe) {
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
