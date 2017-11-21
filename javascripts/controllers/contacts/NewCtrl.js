"use strict"; 

app.controller("NewCtrl", function($rootScope, $scope, $timeout, ContactService){

    const alertTimeout = (timeoutInSeconds) => {
        $timeout(() => {
            $('.alert').alert('close');
        }, timeoutInSeconds * 1000);     
    };

    $scope.submitForm = ()  => {
        if ($scope.newContactForm.$valid) {
            $scope.contact.uid = $rootScope.uid;
            ContactService.addNewContact($scope.contact).then((result) => {
                if (result.status === 200) {
                    $scope.contact={};
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


