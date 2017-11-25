"use strict"; 

app.controller("EditModalCtrl", function ($uibModal, $q, $scope, $timeout, $uibModalInstance, ContactService) {
     
    $scope.contact = angular.copy($scope.contact);                
    
    const alertTimeout = (timeoutInSeconds) => {
        return $q((resolve, reject) => {
            $timeout(() => {
                $('.alert').alert('close');
                resolve(); 
            }, timeoutInSeconds * 1000);  
        });    
    };

    const cleanContact = () => {
        delete $scope.contact.$$hashKey; 
    };   
        
    
    $scope.submitForm = ()  => {
        if ($scope.editContactForm.$valid) {
            cleanContact(); 
            ContactService.updateContact($scope.contact.id, $scope.contact).then((result) => {
                if (result.status === 200) {
                    $scope.contact={};
                    $scope.editContactForm.$setUntouched();
                    $scope.isSuccess = true;
                    alertTimeout(1).then(() => {
                        $uibModalInstance.dismiss('closed'); 
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
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});