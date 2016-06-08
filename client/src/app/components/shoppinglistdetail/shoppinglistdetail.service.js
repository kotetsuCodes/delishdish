export default class ShoppinglistDetailService {
    constructor ($resource) {
        'ngInject';

        return $resource(BACKEND_URL + '/shoppinglists/:id', {}, {
            'getShoppinglist': {
                method: 'GET'
            },
            'getRecipe': {
                url: BACKEND_URL + '/recipes/:id',
                method: 'GET'
            }
        });
    }
}
