export default class ShoppinglistService {
    constructor ($resource) {
        'ngInject';

        return $resource(BACKEND_URL + '/shoppinglists', {}, {
            'getShoppinglists': {
                method: 'GET',
                isArray: true
            },
            'getShoppinglist': {
                url: BACKEND_URL + '/shoppinglists/:id',
                method: 'GET'
            },
            'createShoppinglist': {
                url: BACKEND_URL + '/shoppinglists',
                method: 'POST'
            },
            'updateShoppinglist': {
                url: BACKEND_URL + '/shoppinglists/:id',
                method: 'PUT'
            },
            'removeShoppinglist': {
                url: BACKEND_URL + '/shoppinglists/:id',
                method: 'DELETE'
            }
        });
    }
};
