export default class profileService {
    constructor ($resource) {
        'ngInject';

        return $resource(BACKEND_URL + '/signout', {}, {
            'signout': {
                method: 'POST'
            },
            'getAccount': {
                url: BACKEND_URL + '/user',
                method: 'GET',
                isArray: false
            },
            'updateAccount': {
                url: BACKEND_URL + '/user',
                method: 'PUT'
            }
        });
    }
};