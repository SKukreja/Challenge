app.controller("SendController", function($scope, $http, $state, $cookieStore, $rootScope){
    $scope.loggedInUser = $cookieStore.get('loggedIn');
    $scope.receiver = $rootScope.user;
    
    if($scope.loggedInUser == '') {
        $state.go("login");
    }

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
    
    
    $scope.logout = function () {
        $cookieStore.put('loggedIn', '');
        $state.go("login");
    }
    
    $scope.send = function () {
        var data = {
            sEmail: $scope.loggedInUser,
            sBalance: $scope.balance - $scope.sendAmount,
            rEmail: $scope.receiver.email,
            rBalance: parseFloat($scope.receiver.balance) + $scope.sendAmount
        }
        
        console.log(data);
        
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
});