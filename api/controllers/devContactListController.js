const Contact = require("../models/devContact");

exports.listAllContacts = (req, res) => {
  Contact.find({}, (err, contact) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(contact);
  });
};

exports.listCategoryContacts = (req, res) => {
  Contact.find({ category: req.params.category }, (err, contact) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(contact);
  });
};

exports.createNewContact = (req, res) => {
  let newContact = new Contact(req.body);
  newContact.save((err, contact) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(contact);
  });
};

exports.readContact = (req, res) => {
  Contact.findById(req.params.contactid, (err, contact) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(contact);
  });
};

exports.updateContact = (req, res) => {
  Contact.findOneAndUpdate({ _id: req.params.contactid }, req.body, { new: true }, (err, contact) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(contact);
  }
  );
};

exports.deleteContact = async ( req, res) => { 
  await Contact.deleteOne({ _id: req.params.contactid }, (err, contact) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "Contact successfully deleted" });
  });
};