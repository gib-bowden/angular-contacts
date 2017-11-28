"use strict"; 

app.controller("DetailCtrl", function($location, $rootScope, $q, $routeParams, $scope, $timeout, ContactService){


    $scope.deleteContact = () => {
        ContactService.deleteContact($scope.contact.id).then(() => {
            $scope.$dismiss('cancel');
       }).catch((err) => {
            console.log(err); 
       });
   };

   $scope.toggleFavorite = () => {
       $scope.contact.isFavorite = !$scope.contact.isFavorite;
       delete $scope.contact.$$hashKey;
       ContactService.updateContact($scope.contact.id, $scope.contact); 
   };

   $scope.cancel = function () {
    $scope.$dismiss('cancel');
};


    

}); 