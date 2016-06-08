import templateUrl from './recipe.view.html';
import recipeDetailsTemplate from './recipedetails.view.html';
import recipeEditTemplate from './recipe.edit.view.html';
import recipeAddTemplate from './recipe.add.view.html';

export default function routes ($stateProvider) {
    'ngInject';
    $stateProvider
    .state('base.recipes', {
        url: 'recipes',
        views: {
            'body@': {
                templateUrl,
                controller: 'RecipeController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    })
    .state('base.recipes.recipedetails', {
        url: '/details/:id',
        views: {
            'body@': {
                templateUrl: recipeDetailsTemplate,
                controller: 'RecipeController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    })
    .state('base.recipes.addrecipe', {
        url: '/add',
        views: {
            'body@': {
                templateUrl: recipeAddTemplate,
                controller: 'RecipeController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }

    })
    .state('base.recipes.editrecipe', {
        url: '/edit/:id',
        views: {
            'body@': {
                templateUrl: recipeEditTemplate,
                controller: 'RecipeController',
                controllerAs: '$ctrl',
                bindToController: true
            }
        }
    });
};
