"use strict"; 

app.controller("EditModalCtrl", function ($uibModal, $q, $scope, $timeout, $uibModalInstance, ContactService) {
     
    $scope.contact = angular.copy($scope.contact);  
    $scope.contactStatic = angular.copy($scope.contact);       
    
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
                    ContactService.alertTimeout(1).then(() => {
                        $scope.$dismiss('closed'); 
                    }); 
                }
                else {
                    $scope.isSuccess = false;
                    ContactService.alertTimeout(3);
                }
            }).catch((err) => {
                console.log(err); 
                $scope.isSuccess = false;
                ContactService.alertTimeout(3); 
            });
        }
    };
    
    $scope.cancel = function () {
        $scope.$dismiss('closed');
    };
});