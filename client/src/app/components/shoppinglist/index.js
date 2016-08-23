import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './shoppinglist.routes.js';
import ShoppinglistController from './shoppinglist.controller.js';
import ShoppinglistService from './shoppinglist.service.js';
import RecipeService from '../recipe/recipes.service.js';
import AccordianComponent from './accordian.component';

export default angular.module('app.shoppinglist', [uirouter, ngResource])
	.config(routing)
	.controller('ShoppinglistController', ShoppinglistController)
	.service('ShoppinglistService', ShoppinglistService)
    .service('RecipeService', RecipeService)
    .component('accordian', AccordianComponent)
	.name;
