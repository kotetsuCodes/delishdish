import signupTemplateUrl from './signup.view.html';
export default function routes ($stateProvider) {
    'ngInject';
    $stateProvider
    .state('signup', {
        url: '/signup',
        views: {
            'body@': {
                templateUrl: signupTemplateUrl,
                controller: 'SignupController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    });
};