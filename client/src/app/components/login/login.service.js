export default class loginService {
    constructor ($resource) {
        'ngInject';

        return $resource(BACKEND_URL + '/login', {}, {
            'login': {
                method: 'POST'
            }
        });
    }
};
