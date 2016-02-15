app.controller("DashController", function($scope, $http, $state, $cookieStore, $rootScope){
    $scope.loggedInUser = $cookieStore.get('loggedIn');
    if($scope.loggedInUser == '') {
        $state.go("login");
    }

    $scope.balance = 0;

    var data = {
        email: $scope.loggedInUser
    }
    
    $http.post("endpoints/userInfo.php", data).success(function(response){
        $scope.balance = response.balance;
        $scope.fname = response.fname;
        $scope.lname = response.lname;
    }).error(function(error){
        console.error(error);
    });
    
    $http.post("endpoints/userList.php", data).success(function(response){
        $scope.userList = response;
    }).error(function(error){
        console.error(error);
    });
    
    $scope.logout = function () {
        $cookieStore.put('loggedIn', '');
        $state.go("login");
    }
    
    $scope.send = function (user) {
        $rootScope.user = user;
        $state.go("send");
    }
});