//This is the controller for the dashboard which is where you are taken after logging in.
 
app.controller("DashController", function($scope, $http, $state, $cookieStore, $rootScope){
    //Check cookie store to see if the user is logged in
    $scope.loggedInUser = $cookieStore.get('loggedIn');
    if($scope.loggedInUser == '' || $scope.loggedInUser == undefined) {
        //If not, take user to login page
        $state.go("login");
    }

    $scope.balance = 0;

    var data = {
        email: $scope.loggedInUser
    }
    
    //AJAX call to retrieve user's information based on email address retrieved from cookie   
    $http.post("endpoints/userInfo.php", data).success(function(response){
        $scope.balance = response.balance;
        $scope.fname = response.fname;
        $scope.lname = response.lname;
    }).error(function(error){
        console.error(error);
    });
    
    //AJAX call to retrieve list of all users and their balances
    $http.post("endpoints/userList.php", data).success(function(response){
        $scope.userList = response;
    }).error(function(error){
        console.error(error);
    });
    
    //Function to log out by removing their session from the cookie
    $scope.logout = function () {
        $cookieStore.put('loggedIn', undefined);
        $state.go("login");
    }
    
    //Function to go to send page while passing the selected user to send money to
    $scope.send = function (user) {
        $rootScope.user = user;
        $state.go("send");
    }
});