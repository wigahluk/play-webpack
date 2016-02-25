import * as angular from 'angular'
//import controller from './controller';

const app = angular.module('app', []);



//var app = angular.module('app', []);
app.controller('greetings', function($scope) {
    $scope.name = 'Welcome!';
});
console.log('pre-ready');
angular.element(document).ready(() => {
    console.log('ready');
    angular.bootstrap(document, ['app']);
});