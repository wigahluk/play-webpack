import * as angular from 'angular'

export default class HomeController {
    name: string;

    constructor() {
        this.name = 'World';

        angular.copy(1);
    }

    changeName() {
        this.name = 'angular-tips';
    }
}