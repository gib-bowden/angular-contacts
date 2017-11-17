"use strict"; 

app.controller("NewCtrl", function($scope){

    // function to submit the form after all validation has occurred			
    $scope.submitForm = ()  => {
    // check to make sure the form is completely valid
    if ($scope.newContactForm.$valid) {
        console.log($scope.contact);
        $scope.newContactForm.$setUntouched();
        $scope.contact={};
    }
    };

}); 