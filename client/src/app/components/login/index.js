import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './login.routes.js';
import LoginController from './login.controller.js';
import LoginService from './login.service.js';

export default angular.module('app.login', [uirouter, ngResource])
  .config(routing)
  .controller('LoginController', LoginController)
  .service('loginService', LoginService)
  .name;
