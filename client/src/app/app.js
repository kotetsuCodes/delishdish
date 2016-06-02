import '../style/app.scss';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import home from './components/home';
import recipe from './components/recipe';
import shoppinglist from './components/shoppinglist';
import shoppinglistdetail from './components/shoppinglistdetail';

angular.module('app', [uirouter, home, recipe, shoppinglist, shoppinglistdetail]).config(routing);

