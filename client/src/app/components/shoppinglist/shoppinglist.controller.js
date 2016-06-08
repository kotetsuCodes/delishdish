export default class ShoppinglistController {
    constructor ($stateParams, ShoppinglistService, RecipeService) {
        'ngInject';

        this.shoppinglistService = ShoppinglistService;
        this.recipeService = RecipeService;
        this.userEmail = 'carl@test.com';
        this.shoppinglists = this.shoppinglistService.getShoppinglists();
        this.recipes = this.recipeService.getRecipes();
        // clear out form bindings
        this.newShoppinglist = {};
        this.newShoppinglist.recipes = [];

        this.$stateParams = $stateParams;
        this.shoppinglist = {};

        if ($stateParams.id) {
            this.shoppinglistService.getShoppinglist({id: this.$stateParams.id}).$promise.then(response => {
                this.shoppinglist = response;
            });
        }
    }

    saveShoppinglist () {
        if (this.newShoppinglist.name && this.newShoppinglist.recipes.length > 0) {
            this.shoppinglistService.createShoppinglist({name: this.newShoppinglist.name, email: this.userEmail, recipes: this.newShoppinglist.recipes})
            .$promise.then(response => {
                this.shoppinglists.push({name: this.newShoppinglist.name, email: this.userEmail, recipes: this.newShoppinglist.recipes});
                // clear out form bindings
                this.newShoppinglist = {};
                this.newShoppinglist.recipes = [];
            });
        }
    }

    removeShoppinglist (index) {
        this.shoppinglistService.removeShoppinglist({id: this.shoppinglists[index]._id})
        .$promise.then(response => {
            this.shoppinglists.splice(index, 1);
        });
    }

    updateShoppinglist () {
        this.shoppinglistService.updateShoppinglist({id: this.shoppinglist._id}, this.shoppinglist);
    }

    addRecipeToShoppinglist (shoppinglist, recipe) {
        shoppinglist.recipes.push(recipe._id);
    }

    removeRecipeFromShoppinglist (shoppinglist, index) {
        shoppinglist.recipes.splice(index, 1);
    }
}
