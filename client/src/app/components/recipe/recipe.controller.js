export default class RecipeController {
    constructor ($stateParams, recipeService, $state) {
        'ngInject';

        this.recipeService = recipeService;
        this.recipes = recipeService.getRecipes();
        console.log(recipeService.getIngredientSuggestions());
        this.ingredientSuggestions = recipeService.getIngredientSuggestions();
        this.quantityTypeSuggestions = recipeService.getQuantityTypeSuggestions();
        this.showIngredientSuggestions = false;
        this.showQuantityTypeSuggestions = false;
        this.newRecipe = {};
        this.newRecipe.ingredients = [];
        this.newIngredient = {};
        this.currentIngredient = {name: '', quantity_type: 'cup', quantity: 1};

        this.$state = $state;
        this.$stateParams = $stateParams;
        this.recipe = {};

        this.activeTabs = [];

        if ($stateParams.id) {
            this.recipeService.getRecipe({id: this.$stateParams.id}).$promise.then(response => {
                this.recipe = response;
            });
        }
    }

    isNewIngredient () {
        for (let i = 0; i < this.ingredientSuggestions.length; i++) {
            if (this.ingredientSuggestions[i].name === this.currentIngredient.name) {
                return false;
            }
        }

        return true;
    }

    isNewQuantityType () {
        for (let i = 0; i < this.quantityTypeSuggestions.length; i++) {
            if (this.quantityTypeSuggestions[i].name === this.currentIngredient.quantity_type) {
                return false;
            }
        }

        return true;
    }

    addIngredient () {
        if (this.currentIngredient.name && this.currentIngredient.quantity && this.currentIngredient.quantity_type) {
            // check if ingredient is new, if so add it to db
            if(this.isNewIngredient()) {
                this.recipeService.addIngredient({'name': this.currentIngredient.name}).$promise.then(response => {
                    this.ingredientSuggestions.push({'name': this.currentIngredient.name});
                    console.log(this.ingredientSuggestions);
                });
            }

            if (this.isNewQuantityType()) {
                this.recipeService.addQuantityType({'name': this.currentIngredient.quantity_type}).$promise.then(response => {
                    this.quantityTypeSuggestions.push({'name': this.currentIngredient.quantity_type});
                });
            }

            this.newRecipe.ingredients.push({name: this.currentIngredient.name, quantity: this.currentIngredient.quantity, quantity_type: this.currentIngredient.quantity_type});

            // clear out form bindings
            this.currentIngredient = { name: '', quantity_type: 'cup', quantity: 1 };
            this.showIngredientSuggestions = false;
            this.showQuantityTypeSuggestions = false;
        }
    }

    removeIngredient (recipe, index) {
        recipe.ingredients.splice(index, 1);
    }

    removeIngredientFromRecipe (recipe, index) {
        recipe.ingredients.splice(index, 1);
        if (recipe.ingredients.length === 0) {
            this.recipeService.removeRecipe({id: recipe._id})
            .$promise.then(response => {
                let recipeIndex = this.findRecipeById(recipe._id, this.recipes);
                if (recipeIndex > -1) {
                    this.recipes.splice(recipeIndex, 1);
                }
            });
        } else {
            this.recipeService.updateRecipe({id: recipe._id}, recipe);
        }
    }

    saveRecipe () {
        if (this.newRecipe.name && this.newRecipe.ingredients.length > 0) {
            console.log('saving recipe');
            this.newRecipe.email = 'carl@test.com';
            this.newRecipe.shared = true;

            this.recipeService.createRecipe(this.newRecipe)
            .$promise.then(response => {
                this.recipes.push({name: this.newRecipe.name, calorie_count: this.newRecipe.calorie_count, email: this.newRecipe.email, shared: this.newRecipe.shared, ingredients: this.newRecipe.ingredients});
                this.$state.go('base.recipes');
                // clear out form bindings
                // this.newRecipe = {};
                // this.newRecipe.ingredients = [];
                // this.currentIngredient = {};
            });
        }
    }

    removeRecipe (index) {
        this.recipeService.removeRecipe({id: this.recipes[index]._id});
        this.recipes.splice(index, 1);
    }

    updateRecipe () {
        this.recipeService.updateRecipe({id: this.recipe._id}, this.recipe);
    }

    toggleIngredientSuggestions (show) {
        this.showIngredientSuggestions = show;
    }

    checkIfIngredientSuggestionsShouldShow () {
        this.showIngredientSuggestions = !!this.newIngredient.name;
    }

    toggleQuantityTypeSuggestions (show) {
        this.showQuantityTypeSuggestions = show;
    }

    checkIfQuantityTypeSuggestionsShouldShow () {
        this.showQuantityTypeSuggestions = !!this.newIngredient.quantity_type;
    }

    updateIngredientField (ingredient) {
        this.newIngredient.name = ingredient.name;
        this.showIngredientSuggestions = false;
    }

    updateQuantityTypeField (quantityType) {
        this.newIngredient.quantity_type = quantityType.name;
        this.showQuantityTypeSuggestions = false;
    }

    toggleTab (name) {
        if (this.activeTabs.indexOf(name) === -1) {
            this.activeTabs.push(name);
        } else {
            this.activeTabs.splice(this.activeTabs.indexOf(name), 1);
        }
    }

    isInActiveTabs (name) {
        return this.activeTabs.indexOf(name) > -1;
    }

    setQuantityType (quantityType) {
        this.quantitySelect = '';
        this.currentIngredient.quantity_type = quantityType;
    }

    setIngredientName (ingredient) {
        this.ingredientSelect = '';
        this.currentIngredient.name = ingredient;
    }

    setCurrentIngredient (ingredient) {
        if(this.currentIngredient.name === ingredient.name) {
            this.currentIngredient.name = '';
        } else {
            this.currentIngredient.name = ingredient.name;
        }
    }

    findRecipeById(id, array) {
        for(var i = 0; i < array.length; i++) {
            if (array[i]._id === id) {
                return i;
            }
        }

        return -1;
    }
}
