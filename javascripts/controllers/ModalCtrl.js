"use strict"; 

app.controller("ModalCtrl", ['$rootScope', '$scope', '$uibModal', '$log',

    function ($rootScope, $scope, $uibModal, $log, EditCtrl) {

        $scope.launchModal = (template, controller) => {

            var modalInstance = $uibModal.open({
                templateUrl: template, 
                controller: controller, 
                scope: $scope,
            });

            modalInstance.result.then(function () {
            }, function () {
                $scope.$emit('updateContacts');
            });
        };
    }
]);


