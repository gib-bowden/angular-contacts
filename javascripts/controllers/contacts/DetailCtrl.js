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

    $scope.deleteContact = (contactId) => {
        ContactService.deleteContact(contactId).then(() => {
            $location.path('/contacts/view'); 
       }).catch((err) => {
            console.log(err); 
       });
   };

   $scope.toggleFavorite = (contact) => {
       contact.isFavorite = !contact.isFavorite;
       delete contact.$$hashKey;
       ContactService.updateContact(contact.id, contact); 
   };

   $scope.editContact = (contactId) => {
       $location.path(`/contacts/edit/${contactId}`); 
   };
    

}); 