export default class ShoppinglistDetailController {
    constructor ($stateParams, ShoppinglistDetailService) {
        'ngInject';
        this.shoppinglistName = '';
        this.recipes = [];
        ShoppinglistDetailService.getShoppinglist({id: $stateParams.id}).$promise.then(response => {
            this.shoppinglistName = response.name;
            for (let i = 0; i < response.recipes.length; i++) {
                ShoppinglistDetailService.getRecipe({id: response.recipes[i]}).$promise.then(value => {
                    if (value) {
                        this.recipes.push(value);
                    }
                });
            }
        });
    }
}
