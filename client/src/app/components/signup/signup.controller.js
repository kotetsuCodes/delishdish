export default class SignupController {
    constructor (signupService, $window, $state) {
        'ngInject';
        this.signupService = signupService;
        this.notificationMessage = null;
        this.$window = $window;
        this.$state = $state;
    }

    signup () {
        this.notificationMessage = null;

        if (this.password !== this.confirmPassword) {
            this.notificationMessage = { notice: true, message: 'Passwords do not match!' };
        } else {
            this.signupService.signup({ email: this.email, password: this.password }).$promise.then(response => {
                this.$window.localStorage.token = response.token;
                this.state.go('base.shoppinglists');
            }, error => {
                this.notificationMessage = { error: true, message: 'Unknown Error occurred' };
            });
        }
    }

    checkPasswords () {
        this.notificationMessage = null;
        if (this.password !== this.confirmPassword) {
            this.notificationMessage = { notice: true, message: 'Passwords do not match!' };
        }
    }
}