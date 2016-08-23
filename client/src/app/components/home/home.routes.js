import homeTemplateUrl from './home.view.html';
import navTemplateUrl from './nav.view.html';
export default function routes ($stateProvider) {
    'ngInject';
    $stateProvider
    .state('base', {
        url: '/',
        views: {
            'body@': {
                templateUrl: homeTemplateUrl,
                controller: 'HomeController',
                controllerAs: '$ctrl',
                bindToController: true
            },
            'nav@': {
                templateUrl: navTemplateUrl,
                controller: 'NavController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    });
};
