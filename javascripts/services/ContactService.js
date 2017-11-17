"use strict"; 

app.service("ContactService", function($http, FIREBASE_CONFIG){

    const addNewContact = (contact) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify(contact));
    };



    return {addNewContact}; 
});