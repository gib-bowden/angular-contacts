"use strict"; 

app.controller("NewCtrl", function($uibModal, $q, $rootScope, $scope, $timeout, ContactService){

   
    const alertTimeout = (timeoutInSeconds) => {
        return $q((resolve, reject) => {
            $timeout(() => {
                $('.alert').alert('close');
                resolve(); 
            }, timeoutInSeconds * 1000);  
        });    
    };

    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    $scope.submitForm = ()  => {
        if ($scope.newContactForm.$valid) {
            $scope.contact.uid = $rootScope.uid;
            ContactService.addNewContact($scope.contact).then((result) => {
                if (result.status === 200) {
                    $scope.contact={};
                    $scope.newContactForm.$setUntouched();
                    $scope.isSuccess = true;
                    alertTimeout(1).then(() => {
                        $scope.$dismiss('closed'); 
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


