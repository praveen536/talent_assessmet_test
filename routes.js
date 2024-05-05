myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('');

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("quiz", {
        url: '/',
        templateUrl: 'talent_assessmet_test/quiz.html',
        controller: 'myCon',
    });

}]);
