export default class NavController {
    constructor ($location) {
        'ngInject';
        this.location = $location;
    }

    isActive (viewLocation) {
        var active = this.location.path().indexOf(viewLocation) > -1;
        return active;
    };
}
