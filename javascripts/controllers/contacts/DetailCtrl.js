"use strict"; 

app.controller("DetailCtrl", function($location, $rootScope, $q, $routeParams, $scope, $timeout, ContactService){

    const getContact = () => {
        ContactService.getSingleContact($routeParams.id).then((results) => {
            $scope.contact = results.data; 
        }).catch((err) => {
            console.log(err); 
        });
    };

    getContact(); 

    $scope.deleteContact = () => {
        ContactService.deleteContact($routeParams.id).then(() => {
            $location.path('/contacts/view'); 
       }).catch((err) => {
            console.log(err); 
       });
   };

   $scope.toggleFavorite = () => {
       $scope.contact.isFavorite = !$scope.contact.isFavorite;
       ContactService.updateContact($routeParams.id, $scope.contact); 
   };

   $scope.editContact = () => {
       $location.path(`/contacts/edit/${$routeParams.id}`); 
   };
    

}); 