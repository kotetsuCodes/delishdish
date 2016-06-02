export default class ShoppinglistService {
    constructor ($resource) {
        'ngInject';

        return $resource(BACKEND_URL + '/shoppinglists?email=:email', {}, {
            'getShoppinglistsByEmail': {
                method: 'GET',
                isArray: true
            },
            'getShoppinglistById': {
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
