"use strict"; 

app.controller("NewCtrl", function($scope, $timeout, ContactService){

    const alertTimeout = (timeoutInSeconds) => {
        $timeout(() => {
            $('.alert').alert('close');
        }, timeoutInSeconds * 1000);     
    };

    // function to submit the form after all validation has occurred			
    $scope.submitForm = ()  => {
    // check to make sure the form is completely valid
        if ($scope.newContactForm.$valid) {
            console.log($scope.contact);
            ContactService.addNewContact($scope.contact).then((result) => {
                $scope.contact={};
                if (result.status === 400) {
                    $scope.newContactForm.$setUntouched();
                    $scope.isSuccess = true;
                    alertTimeout(3); 
                }
                else {
                    $scope.isSuccess = false;
                    alertTimeout(3);
                }
            }).catch((err) => {
                console.log(err); 
                $scope.isSuccess = false;
                alertTimeout(3); 
            });
        }
    };
}); 