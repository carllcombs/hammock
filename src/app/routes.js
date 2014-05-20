// routes.js

hammockApp.config(['$routeProvider', function($routeProvider)
{
    $routeProvider.
        when('/', {
            templateUrl: 'partials/index.html',
            controller: 'IndexCtrl'
        }).
        when('/blank', {
            templateUrl: 'partials/blank.html',
            controller: 'BlankCtrl'
        }).
        when('/buttons', {
            templateUrl: 'partials/buttons.html',
            controller: 'ButtonsCtrl'
        }).
        otherwise({
            redirectTo: '/404'
        });
}]);