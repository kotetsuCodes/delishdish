export default class ShoppinglistController {
    constructor ($stateParams, ShoppinglistService, RecipeService, $state, $scope) {
        'ngInject';

        this.shoppinglistService = ShoppinglistService;
        this.recipeService = RecipeService;
        this.userEmail = 'carl@test.com';
        this.shoppinglists = this.shoppinglistService.getShoppinglists();
        this.recipes = this.recipeService.getRecipes();
        // clear out form bindings
        this.newShoppinglist = {};
        this.newShoppinglist.recipes = [];

        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.shoppinglist = {};

        this.activeTabs = [];

        if ($stateParams.id) {
            this.shoppinglistService.getShoppinglist({id: this.$stateParams.id}).$promise.then(response => {
                this.shoppinglist = response;
            });
        }
    }

    saveShoppinglist () {
        if (this.newShoppinglist.name && this.newShoppinglist.recipes.length > 0) {
            this.shoppinglistService.createShoppinglist({name: this.newShoppinglist.name, email: this.userEmail, recipeIds: this.newShoppinglist.recipes})
            .$promise.then(response => {
                this.shoppinglists.push({name: this.newShoppinglist.name, email: this.userEmail, recipeIds: this.newShoppinglist.recipes});
                this.$state.go('base.shoppinglists');
                // clear out form bindings
                // this.newShoppinglist = {};
                // this.newShoppinglist.recipes = [];
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
        // shoppinglist.recipes.push(recipe._id);
        shoppinglist.recipes.push(recipe);
    }

    removeRecipeFromShoppinglist (shoppinglist, index) {
        shoppinglist.recipeIds.splice(index, 1);
        if (shoppinglist.recipeIds.length === 0) {
            this.shoppinglistService.removeShoppinglist({id: shoppinglist._id})
            .$promise.then(response => {
                let shoppinglistIndex = this.findShoppinglistById(shoppinglist._id, this.shoppinglists);
                if(shoppinglistIndex > -1) {
                    this.shoppinglists.splice(index, 1);
                }
            });
        } else {
            this.shoppinglistService.updateShoppinglist({id: shoppinglist._id}, shoppinglist);
        }
    }

    removeRecipeFromCurrentShoppinglist (shoppinglist, index) {
        shoppinglist.recipes.splice(index, 1);
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

    findShoppinglistById (id, array) {
        for(var i = 0; i < array.length; i++) {
            if (array[i]._id === id) {
                return i;
            }
        }
        return -1;
    }

    findRecipeById (id, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i]._id === id) {
                return i;
            }
        }
        return -1;
    }
    
}
