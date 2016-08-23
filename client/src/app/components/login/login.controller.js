export default class LoginController {
    constructor (loginService, $window, $state) {
        'ngInject';

        this.loginService = loginService;
        this.$window = $window;
        this.state = $state;
        this.BadLoginMessage = 'Incorrect username or password';
        this.showUnknownErrorMessage = 'Unknown error occurred';
        this.showBadLoginNotification = false;
        this.showUnknownErrorMessage = false;
    }

    login () {
        this.showUnknownErrorMessage = false;
        this.showBadLoginNotification = false;
        this.loginService.login({email: this.email, password: this.password}).$promise.then(response => {
            this.$window.localStorage.token = response.token;
            this.state.go('base.shoppinglists');
        }, error => {
            if (error.status === 401) {
                this.showBadLoginNotification = true;
            } else {
                this.showUnknownErrorMessage = true;
            }
        });
    }
}
