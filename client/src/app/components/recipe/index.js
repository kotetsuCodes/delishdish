import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './recipe.routes.js';
import RecipeController from './recipe.controller.js';
import RecipeService from './recipes.service.js';
import RecipeAccordianComponent from './recipe.accordian.component';

export default angular.module('app.recipe', [uirouter, ngResource])
  .config(routing)
  .controller('RecipeController', RecipeController)
  .service('recipeService', RecipeService)
  .component('recipeaccordian', RecipeAccordianComponent)
  .name;
