"use strict"; 

app.controller("ModalCtrl", ['$rootScope', '$scope', '$uibModal', '$log',

    function ($rootScope, $scope, $uibModal, $log, EditCtrl) {


        $scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);

            var modalInstance = $uibModal.open({
                templateUrl: 'partials/contacts/edit.html', //'partials/modal.html',
                controller: ModalInstanceCtrl, //ModalInstanceCtrl
                scope: $scope,
                // resolve: {
                //     editContactForm: function () { //userForm:
                //         return $scope.editContactForm;
                //     }
                // }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $scope.$emit('updateContacts');
            });
        };
    }]);

var ModalInstanceCtrl = function ($location, $log, $uibModal, $rootScope, $q, $routeParams, $scope, $timeout, $uibModalInstance, ContactService) {

    $scope.contact = angular.copy($scope.$parent.$parent.contact);    
        

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
};
