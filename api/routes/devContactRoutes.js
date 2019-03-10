'use strict';
module.exports = function(app) {
  var contactList = require('../controllers/devContactListController');
  var userHandlers = require('../controllers/authController');

  // contactList Routes
  app
  .route("/contacts")
  .get(contactList.listAllContacts)
  .post(contactList.createNewContact);
  
 app
  .route("/contact/:contactid")
  .get(contactList.readContact)
  .put(contactList.updateContact)
  .delete(userHandlers.loginRequired,contactList.deleteContact);

  app
  .route("/contacts/by/:category")
  .get(contactList.listCategoryContacts);

  app
  .route("/auth/register")
  .post(userHandlers.register);

  app
  .route("/auth/sign_in")
  .post(userHandlers.signIn);

};