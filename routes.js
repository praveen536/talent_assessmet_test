myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('');

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("quiz", {
        url: '/',
        templateUrl: 'quiz.html',
        controller: 'myCon',
    });

}]);
