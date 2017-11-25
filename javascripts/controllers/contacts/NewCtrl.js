"use strict"; 

app.controller("NewCtrl", function($uibModal, $q, $rootScope, $scope, $timeout, ContactService){


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
}); 


