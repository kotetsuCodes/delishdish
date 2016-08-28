import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './signup.routes.js';
import SignupController from './signup.controller.js';
import SignupService from './signup.service.js';

export default angular.module('app.signup', [uirouter, ngResource])
  .config(routing)
  .controller('SignupController', SignupController)
  .service('signupService', SignupService)
  .name;