myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('');

    $urlRouterProvider.otherwise('/talent_assessmet_test');

    $stateProvider.state("quiz", {
        url: '/talent_assessmet_test/',
        templateUrl: 'quiz.html',
        controller: 'myCon',
    });

}]);
