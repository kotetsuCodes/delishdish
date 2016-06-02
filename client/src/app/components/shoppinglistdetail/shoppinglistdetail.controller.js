export default class ShoppinglistDetailController {
    constructor ($stateParams, ShoppinglistDetailService) {
        'ngInject';
        this.shoppinglistName = '';
        this.recipes = [];
        this.recipeIDs = ShoppinglistDetailService.getShoppinglistById({id: $stateParams.id}).$promise.then(response => {
            this.shoppinglistName = response.name;
            for (let i = 0; i < response.recipes.length; i++) {
                ShoppinglistDetailService.getRecipeByName({name: response.recipes[i]}).$promise.then(value => {
                    if (value[0]) {
                        this.recipes.push(value[0]);
                    }
                });
                // this.recipes.push(recipe);
            }
        });
    }
}
