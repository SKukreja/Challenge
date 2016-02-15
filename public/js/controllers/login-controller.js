//This is the login controller which is the first page you see when coming to the site for the first time
app.controller("LoginController", function($scope, $http, $state, $cookieStore){
    //Check cookie store to see if the user is logged in, if so go to dashboard
    $scope.loggedInUser = $cookieStore.get('loggedIn');
    console.log($scope.loggedInUser);
    if($scope.loggedInUser != undefined) {
        $state.go("dashboard");
    }
    
    //Reset values if necessary
    $scope.register = {
        email: undefined,
        fname: undefined,
        lname: undefined,
        password: undefined,
        balance: 0
    }
    
    $scope.login = {
        username: undefined,
        password: undefined
    }
    
    //Declare booleans to check existing email addresses and incorrect credentials
    $scope.exists = false;
    $scope.wrongInfo = false;
 
    //AJAX call to create a new user with a balance of $100 with data from registration form
    $scope.registerUser = function (){
        var data = {
            email: $scope.register.email,
            fname: $scope.register.fname,
            lname: $scope.register.lname,
            password: $scope.register.password,
            balance: 100.00
        }
        
        //On success go to dashboard, else do nothing
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
    
    //AJAX call to login user based on entered credentials
    $scope.loginUser = function () {
         var data = {
            email: $scope.login.email,
            password: $scope.login.password
        }
        
        //On success go to dashboard, else set boolean for incorrect credentials to true
        $http.post("endpoints/login.php", data).success(function(response){
            if(response=="ERROR"){
                $scope.wrongInfo = true;
            }
            else {
                $cookieStore.put('loggedIn', response);
                $state.go("dashboard");
            }
        }).error(function(error){
            console.error(error);
        });
    
    }
    
    //AJAX call to check if email exists in database or not every time email field loses focus
    $scope.checkEmail = function (email) {
        var data = {
            email: email
        }
        
        //Change boolean depending on if it returns true or not
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