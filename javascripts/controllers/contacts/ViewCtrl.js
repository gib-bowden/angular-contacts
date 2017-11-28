"use strict"; 

app.controller("ViewCtrl", function($location, $rootScope, $scope, ContactService){
    $scope.contacts = [];  
    
    const getContacts = () => {
        ContactService.getFbContacts($rootScope.uid).then((results) => {
            $scope.contacts = results;
        }).catch((err) => {
            console.log(err); 
        }); 
    };

    $scope.$on("updateContacts",() => {
        getContacts(); 
     });

    getContacts(); 

    $scope.deleteContact = (contactId) => {
         ContactService.deleteContact(contactId).then(() => {
            getContacts();  
        }).catch((err) => {
            console.log(err); 
        });
    };

    $scope.toggleFavorite = (contact) => {
        contact.isFavorite = !contact.isFavorite;
        delete contact.$$hashKey;
        ContactService.updateContact(contact.id, contact); 
    };

    $scope.routeToNew = () => {
        $location.path('/contacts/new');
    };

    $scope.editContact = (contactId) => {
        $location.path(`/contacts/edit/${contactId}`); 
    };

    $scope.contactDetail = (contactId) => {
        $location.path(`/contacts/detail/${contactId}`); 
    };

    console.log($scope); 

}); 