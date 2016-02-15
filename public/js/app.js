var app = angular.module("CodingChallenge", ["ui.router", "ngCookies", "ngMessages"]);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
	$stateProvider
        .state("login", {
            url:"/",
            controller: "LoginController",
            templateUrl: "views/login.html"
        })
        
        .state("dashboard", {
            url:"/dashboard",
            controller: "DashController",
            templateUrl: "views/dashboard.html"
        })
        
        .state("send", {
            url:"/send",
            controller: "SendController",
            templateUrl: "views/send.html"
        })
})

var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};
 
app.directive("compareTo", compareTo);