import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './shoppinglistdetail.routes.js';
import ShoppinglistDetailController from './shoppinglistdetail.controller.js';
import ShoppinglistDetailService from './shoppinglistdetail.service.js';

export default angular.module('app.shoppinglistdetail', [uirouter, ngResource])
    .config(routing)
    .controller('ShoppinglistDetailController', ShoppinglistDetailController)
    .service('ShoppinglistDetailService', ShoppinglistDetailService)
    .name;
