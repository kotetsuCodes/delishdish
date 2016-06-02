import templateUrl from './shoppinglistdetail.view.html';

export default function routes ($stateProvider) {
    'ngInject';
    $stateProvider
    .state('base.shoppinglistdetail', {
        url: 'shoppinglistdetail/:id',
        views: {
            'body@': {
                templateUrl: templateUrl,
                controller: 'ShoppinglistDetailController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    });
}
