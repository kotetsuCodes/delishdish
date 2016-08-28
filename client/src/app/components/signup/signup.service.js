export default class signupService {
    constructor ($resource) {
        'ngInject';

        return $resource(BACKEND_URL + '/signup', {}, {
            'signup': {
                method: 'POST'
            }
        });
    }
};