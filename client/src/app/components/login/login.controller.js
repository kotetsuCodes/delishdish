export default class LoginController {
    constructor (loginService, $window) {
        'ngInject';

        this.loginService = loginService;
        this.$window = $window;
    }

    login () {
        this.loginService.login({email: this.email, password: this.password}).$promise.then(response => {
            this.$window.localStorage.token = response.token;
        });
    }

}
