import profileTemplateUrl from './profile.view.html';
export default function routes ($stateProvider) {
    'ngInject';
    $stateProvider
    .state('base.profile', {
        url: 'profile',
        views: {
            'body@': {
                templateUrl: profileTemplateUrl,
                controller: 'ProfileController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    });
};