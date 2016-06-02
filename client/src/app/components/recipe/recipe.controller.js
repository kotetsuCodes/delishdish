export default class RecipeController {
    constructor ($stateParams, recipeService) {
        'ngInject';

        this.recipeService = recipeService;
        this.recipes = recipeService.getRecipesByEmail({email: 'carl@test.com'});
        this.ingredientSuggestions = recipeService.getIngredientSuggestions();
        this.quantityTypeSuggestions = recipeService.getQuantityTypeSuggestions();
        this.showIngredientSuggestions = false;
        this.showQuantityTypeSuggestions = false;
        this.newRecipe = {};
        this.newRecipe.ingredients = [];
        this.newIngredient = {};

        this.$stateParams = $stateParams;
        this.recipe = {};

        if ($stateParams.id) {
            this.recipeService.getRecipeById({id: this.$stateParams.id}).$promise.then(response => {
                this.recipe = response;
            });
        }
    }

    isNewIngredient () {
        for (let i = 0; i < this.ingredientSuggestions.length; i++) {
            if (this.ingredientSuggestions[i].name === this.newIngredient.name) {
                return false;
            }
        }

        return true;
    }

    isNewQuantityType () {
        for (let i = 0; i < this.quantityTypeSuggestions.length; i++) {
            if (this.quantityTypeSuggestions[i].name === this.newIngredient.quantity_type) {
                return false;
            }
        }

        return true;
    }

    addIngredient (recipe) {
        if (this.newIngredient.name && this.newIngredient.quantity && this.newIngredient.quantity_type) {
            // check if ingredient is new, if so add it to db
            if (this.isNewIngredient()) {
                this.ingredientSuggestions.push({'name': this.newIngredient.name});
                this.recipeService.addIngredient({'name': this.newIngredient.name});
            }

            if (this.isNewQuantityType()) {
                this.quantityTypeSuggestions.push({'name': this.newIngredient.quantity_type});
                this.recipeService.addQuantityType({'name': this.newIngredient.quantity_type});
            }

            recipe.ingredients.push({name: this.newIngredient.name, quantity: this.newIngredient.quantity, quantity_type: this.newIngredient.quantity_type});

            // clear out form bindings
            this.newIngredient = {};
            this.showIngredientSuggestions = false;
            this.showQuantityTypeSuggestions = false;
        }
    }

    removeIngredient (recipe, index) {
        recipe.ingredients.splice(index, 1);
    }

    addRecipe () {
        if (this.newRecipe.name && this.newRecipe.ingredients.length > 0) {
            this.newRecipe.email = 'carl@test.com';
            this.newRecipe.shared = true;

            this.recipeService.createRecipe(this.newRecipe)
            .$promise.then(response => {
                this.recipes.push({name: this.newRecipe.name, calorie_count: this.newRecipe.calorie_count, email: this.newRecipe.email, shared: this.newRecipe.shared, ingredients: this.newRecipe.ingredients});
                // clear out form bindings
                this.newRecipe = {};
                this.newRecipe.ingredients = [];
                this.newIngredient = {};
            });
        }
    }

    removeRecipe (index) {
        this.recipeService.removeRecipe({id: this.recipes[index].id});
        this.recipes.splice(index, 1);
    }

    updateRecipe () {
        this.recipeService.updateRecipe({id: this.recipe.id}, this.recipe);
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
}
