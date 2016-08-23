import loginTemplateUrl from './login.view.html';
export default function routes ($stateProvider) {
    'ngInject';
    $stateProvider
    .state('login', {
        url: '/login',
        views: {
            'body@': {
                templateUrl: loginTemplateUrl,
                controller: 'LoginController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    });
};
