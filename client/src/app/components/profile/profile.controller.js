export default class ProfileController {
    constructor (profileService, $window, $state, $scope) {
        'ngInject';
        this.profileService = profileService;
        this.notificationMessage = null;
        this.$window = $window;
        this.$state = $state;
        this.$scope = $scope;
        this.accountEmail = '';
        this.password = '********';
        this.notificationMessage = null;
    }

    init () {
        this.profileService.getAccount().$promise.then(response => {
            this.accountEmail = response.email;
        });
    }

    updateProfile () {
        this.notificationMessage = null;

        let prePassword = '';

        if (this.password !== '********') {
            prePassword = this.password;
        }

        this.profileService.updateAccount({ email: this.accountEmail, password: prePassword }).$promise.then(response => {
            this.notificationMessage = { operationSuccessful: true, message: 'User Profile Updated' };   
            setTimeout(() => {
                console.log('timeout function ran');
                 this.notificationMessage = null;
                 this.$scope.$apply();
            }, 4000);
        })
    }

    signout () {
        this.$window.localStorage.removeItem('token');
        this.$state.go('login');
    }
}