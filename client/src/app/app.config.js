export default function routing ($urlRouterProvider, $locationProvider) {
    'ngInject';
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
};

export default function auth ($httpProvider) {
    'ngInject';
    $httpProvider.interceptors.push(function ($q, $location, $window) {
        return {
            request: function (config) {
                if ($window.localStorage.token) {
                    config.headers.Authorization = $window.localStorage.token;
                }

                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
}
