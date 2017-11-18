"use strict"; 

app.controller("ViewCtrl", function($location, $rootScope, $scope, ContactService){
    $scope.contacts = [];  
    
    const getContacts = () => {
        ContactService.getFbContacts($rootScope.uid).then((results) => {
            $scope.contacts = results;
            console.log(results);   
        }).catch((err) => {
            console.log(err); 
        }); 
    };

    getContacts(); 

    $scope.deleteMovie = (contactId) => {
         ContactService.deleteContact(contactId).then((result) => {
            console.log(result); 
            getContacts();  
        }).catch((err) => {
            console.log(err); 
        });
    };

    $scope.routeToNew = () => {
        $location.path('/contacts/new');
    };

}); 