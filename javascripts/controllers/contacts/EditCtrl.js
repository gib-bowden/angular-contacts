"use strict"; 

app.controller("EditCtrl", function($location, $log, $modal, $rootScope, $q, $routeParams, $scope, $timeout, $uibModalInstance, ContactService){
    
    $scope = $scope.$parent.$parent;

    
    console.log("scope in modal", $scope); 

    const alertTimeout = (timeoutInSeconds) => {
        return $q((resolve, reject) => {
            $timeout(() => {
                $('.alert').alert('close');
                resolve(); 
            }, timeoutInSeconds * 1000);  
        });    
    };
    
    // const getContact = () => {
    //     ContactService.getSingleContact($routeParams.id).then((results) => {            
    //         $scope.contact = results.data;
    //         $scope.contact.id = $routeParams.id;
    //     }).catch((err) => {
    //         console.log(err); 
    //     });
    // };



    // getContact(); 

    // const getPreviousPath = () => {
    //     return ($rootScope.prevRoute.params.id) ? $rootScope.prevRoute.$$route.originalPath.replace(/:id/i, `${$rootScope.prevRoute.params.id}`) : $rootScope.prevRoute.$$route.originalPath;
    // }; 


    $scope.submitForm = ()  => {
        if ($scope.editContactForm.$valid) {
            ContactService.updateContact($scope.contact.id, $scope.contact).then((result) => {
                if (result.status === 200) {
                    $scope.contact={};
                    $scope.editContactForm.$setUntouched();
                    $scope.isSuccess = true;
                    alertTimeout(3).then(() => {
                        // $location.path(getPreviousPath()); //update to return to previous path
                        $uibModalInstance.close('closed'); 
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