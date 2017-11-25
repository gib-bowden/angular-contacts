"use strict"; 

app.controller("NavCtrl", function($location, $rootScope, $scope, $window, AuthService){

    $scope.favoritesView = false; 

    
    $scope.logoutUser = () => {
        delete $rootScope.uid; 
        $window.localStorage.clear(); 
        AuthService.logout(); 
        $location.path('/login'); 
    };
    
    $scope.toggleView = () => {
        $scope.favoritesView = !$scope.favoritesView; 
    };
});