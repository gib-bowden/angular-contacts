"use strict"; 

app.controller("EditCtrl", function($location, $rootScope, $q, $routeParams, $scope, $timeout, ContactService){

    const alertTimeout = (timeoutInSeconds) => {
        return $q((resolve, reject) => {
            $timeout(() => {
                $('.alert').alert('close');
                resolve(); 
            }, timeoutInSeconds * 1000);  
        });    
    };
    
    const getContact = () => {
        ContactService.getSingleContact($routeParams.id).then((results) => {
            $scope.contact = results.data; 
        }).catch((err) => {
            console.log(err); 
        });
    };

    getContact(); 
    
    

    $scope.submitForm = ()  => {
        if ($scope.editContactForm.$valid) {
            ContactService.updateContact($scope.contact.id, $scope.contact).then((result) => {
                $scope.contact={};
                if (result.status === 200) {
                    $scope.editContactForm.$setUntouched();
                    $scope.isSuccess = true;
                    alertTimeout(3).then(() => {
                        $location.path(`/contacts/view`); //update to return to previous path
                    }); 
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