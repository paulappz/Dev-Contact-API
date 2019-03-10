'use strict';
module.exports = function(app) {
  var contactList = require('../controllers/devContactListController');

  // contactList Routes
  app
  .route("/contacts")
  .get(contactList.listAllContacts)
  .post(contactList.createNewContact);
  
 app
  .route("/contact/:contactid")
  .get(contactList.readContact)
  .put(contactList.updateContact)
  .delete(contactList.deleteContact);

  app
  .route("/contacts/by/:category")
  .get(contactList.listCategoryContacts);

};