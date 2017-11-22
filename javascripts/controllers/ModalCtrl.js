"use strict"; 

app.controller("ModalCtrl", ['$scope', '$uibModal', '$log',

    function ($scope, $uibModal, $log) {


        $scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);

            var modalInstance = $uibModal.open({
                templateUrl: 'partials/modal.html',
                controller: ModalInstanceCtrl,
                scope: $scope.$parent.$parent,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }]);

var ModalInstanceCtrl = function ($scope, $uibModalInstance, userForm) {
    $scope = $scope.$parent.$parent; 
    $scope.form = {};
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            $uibModalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    console.log("parent of parent scope on modal", $scope);
};