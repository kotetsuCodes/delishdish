import templateUrl from './shoppinglist.view.html';
import shoppinglistAddTemplate from './shoppinglist.add.view.html';
import shoppinglistEditTemplate from './shoppinglist.edit.view.html';
import shoppinglistDetailTemplate from './shoppinglist.detail.view.html';

export default function routes ($stateProvider) {
    'ngInject';
    $stateProvider
    .state('base.shoppinglists', {
        url: 'shoppinglists',
        views: {
            'body@': {
                templateUrl: templateUrl,
                controller: 'ShoppinglistController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    })
    .state('base.shoppinglists.add', {
        url: '/add',
        views: {
            'body@': {
                templateUrl: shoppinglistAddTemplate,
                controller: 'ShoppinglistController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    }).state('base.shoppinglists.edit', {
        url: '/edit/:id',
        views: {
            'body@': {
                templateUrl: shoppinglistEditTemplate,
                controller: 'ShoppinglistController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    }).state('base.shoppinglists.detail', {
        url: '/detail/:id',
        views: {
            'body@': {templateUrl: shoppinglistDetailTemplate,
                controller: 'ShoppinglistController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    });
};

