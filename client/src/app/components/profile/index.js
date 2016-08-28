import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './profile.routes.js';
import ProfileController from './profile.controller.js';
import ProfileService from './profile.service.js';

export default angular.module('app.profile', [uirouter, ngResource])
  .config(routing)
  .controller('ProfileController', ProfileController)
  .service('profileService', ProfileService)
  .name;