"use strict"; 

app.controller("FavoritesCtrl", function($location, $rootScope, $scope, ContactService){
    $scope.favorites = [];  
    
    const getFavorites = () => {
        ContactService.getFbContacts($rootScope.uid).then((results) => {
            $scope.favorites = results.filter((result) => {
                return result.isFavorite;
            });
        }).catch((err) => {
            console.log(err); 
        }); 
    };

    getFavorites(); 

    $scope.deleteContact = (contactId) => {
         ContactService.deleteContact(contactId).then(() => {
            getFavorites();  
        }).catch((err) => {
            console.log(err); 
        });
    };

    $scope.toggleFavorite = (contact) => {
        contact.isFavorite = !contact.isFavorite;
        delete contact.$$hashKey;
        ContactService.updateContact(contact.id, contact).then(() => {
            getFavorites(); 
        }).catch((err) => {
            console.log(err);
        });

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
}); 