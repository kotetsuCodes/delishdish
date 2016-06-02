export default class ShoppinglistDetailService {
    constructor ($resource) {
        'ngInject';

        return $resource(BACKEND_URL + '/shoppinglists/:id', {}, {
            'getShoppinglistById': {
                method: 'GET'
            },
            'getRecipeById': {
                url: BACKEND_URL + '/recipes/:id',
                method: 'GET'
            },
            'getRecipeByName': {
                url: BACKEND_URL + '/recipes?name=:name',
                isArray: true
            }
        });
    }
}
