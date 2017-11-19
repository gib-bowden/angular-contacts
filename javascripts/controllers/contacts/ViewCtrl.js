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

    getContacts(); 

    $scope.deleteContact = (contactId) => {
         ContactService.deleteContact(contactId).then((result) => {
            getContacts();  
        }).catch((err) => {
            console.log(err); 
        });
    };

    $scope.routeToNew = () => {
        $location.path('/contacts/new');
    };

}); 