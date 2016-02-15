//This is the controller for the transfer funds page
app.controller("SendController", function($scope, $http, $state, $cookieStore, $rootScope){
    //Check cookie store to see if the user is logged in
    $scope.loggedInUser = $cookieStore.get('loggedIn');
    $scope.receiver = $rootScope.user;
    
    //If not, take user to login page
    if($scope.loggedInUser == '' || $scope.loggedInUser == undefined) {
        $state.go("login");
    }
    
    //If no receiver has been specified, return to dashboard
    if($scope.receiver == '' || $scope.receiver == undefined) {
        $state.go("dashboard");
    }

    var data = {
        email: $scope.loggedInUser
    }
    
    //AJAX call to retrieve user information
    $http.post("endpoints/userInfo.php", data).success(function(response){
        $scope.balance = response.balance;
        $scope.fname = response.fname;
        $scope.lname = response.lname;
    }).error(function(error){
        console.error(error);
    });
    
    //Function to logout user by clearing cookie session and go to login page
    $scope.logout = function () {
        $cookieStore.put('loggedIn', undefined);
        $state.go("login");
    }
    
    //AJAX call to transfer funds to selected user by removing amount from one account and adding it to the other
    $scope.send = function () {
        var data = {
            sEmail: $scope.loggedInUser,
            sBalance: $scope.balance - $scope.sendAmount,
            rEmail: $scope.receiver.email,
            rBalance: parseFloat($scope.receiver.balance) + $scope.sendAmount
        }
        
        $http.post("endpoints/send.php", data).success(function(response){
            console.log(response);
            $scope.balance = response.balance;
            $scope.fname = response.fname;
            $scope.lname = response.lname;
            $state.go("dashboard");
        }).error(function(error){
            console.error(error);
        });
    }
    
    //Function to return to dashboard
    $scope.dashboard = function () {
        $state.go("dashboard");
    }
});