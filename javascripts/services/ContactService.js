"use strict"; 

app.service("ContactService", function($http, $q, FIREBASE_CONFIG){

    const addNewContact = (contact) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify(contact));
    };

    const getFbContacts = (userUid) => {
        let contacts = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
                let fbContacts = results.data;
                Object.keys(fbContacts).forEach((key) => {
                    fbContacts[key].id = key;
                    contacts.push(fbContacts[key]);                   
                });  
                resolve(contacts); 
            }).catch((err) => {
                console.log(err);
            });
        });
    };   

    const deleteContact = (contactId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`);
    };



    return {addNewContact, deleteContact, getFbContacts}; 
});