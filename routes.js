myapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('');

    $urlRouterProvider.otherwise('/talent_assessmet_test');

    $stateProvider.state("quiz", {
        url: '/talent_assessmet_test',
        templateUrl: 'talent_assessmet_test/quiz.html',
        controller: 'myCon',
    });

}]);
