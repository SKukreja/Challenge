app.controller("LoginController", function($scope, $http, $state, $cookieStore){
    $scope.loggedInUser = $cookieStore.get('loggedIn');
    if($scope.loggedInUser != '') {
        $state.go("dashboard");
    }
    
    //Variables
    $scope.register = {
        email: undefined,
        fname: undefined,
        lname: undefined,
        password: undefined,
        balance: 0
    }
    
    $scope.exists = false;
    
    $scope.login = {
        username: undefined,
        password: undefined
    }
 
    
    //Functions
    
    $scope.registerUser = function (){
        var data = {
            email: $scope.register.email,
            fname: $scope.register.fname,
            lname: $scope.register.lname,
            password: $scope.register.password,
            balance: 100.00
        }
        
        $http.post("endpoints/register.php", data).success(function(response){
            console.log(response);
            if(response=="ERROR"){
                
            }
            else {
                $cookieStore.put('loggedIn', response);
                $state.go("dashboard");
            }
        }).error(function(error){
            console.error(error);
        });
    };
    
    $scope.loginUser = function () {
         var data = {
            email: $scope.login.email,
            password: $scope.login.password
        }
        
        $http.post("endpoints/login.php", data).success(function(response){
            console.log(response);
            $cookieStore.put('loggedIn', response);
            $state.go("dashboard");
        }).error(function(error){
            console.error(error);
        });
    
    }
    
    $scope.checkEmail = function (email) {
        var data = {
            email: email
        }
        
        $http.post("endpoints/checkEmail.php", data).success(function(response){
            console.log(email + " " + response);
            if(response=="EXISTS") {
                $scope.exists = true;
            }
            else {
                $scope.exists = false;
            }
        }).error(function(error){
            console.error(error);
        });
    }
    
})