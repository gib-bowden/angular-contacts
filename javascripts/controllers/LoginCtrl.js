"use strict"; 

app.controller("LoginCtrl", function($location, $rootScope, $scope, AuthService){
    $scope.authenticate = () => {
        AuthService.authenticateGoogle().then((result) => {
            $rootScope.uid = result.user.uid; 
            $scope.$apply(() => {
                $location.url("/contacts/view"); 
            });            
        }).catch((err) =>{
            console.log(err); 
        });
    }; 
}); 