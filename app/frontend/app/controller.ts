export default class HomeController {
    name: string;

    constructor() {
        this.name = 'World';
    }

    changeName() {
        this.name = 'angular-tips';
    }
}