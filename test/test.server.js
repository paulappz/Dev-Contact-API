// endpoint testing with mocha and chai and chai-http

const chai = require('chai');
const chaiHttp = require('chai-http');
var server = require('../server');
const should = chai.should();
var mongoose = require("mongoose");

var Contact = require("../api/models/devContact");
var User = require("../api/models/userModel");

chai.use(chaiHttp);


describe('Developers contact details', function () {
  this.timeout(10000000000);
  Contact.collection.drop();
  User.collection.drop();

  beforeEach(function (done) {
    var newContact = new Contact({
      firstname: 'Paul',
      lastname: 'Oluyege',
      nickname: 'Paulappz',
      category: 'fullstack',
      email: 'pauloluyege@gmail.com',
      Phoneno: 08068492563
    });
    newContact.save(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    Contact.collection.drop().then(function () {
      // success
    }).catch(function () {
      // error handling
      console.warn(' collection may not exists!');
    })
    done();
    

  });

  it('should list ALL developer contacts on /contacts GET', function (done) {
    chai.request(server)
      .get('/contacts')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('firstname');
        res.body[0].should.have.property('lastname');
        res.body[0].should.have.property('nickname');
        res.body[0].should.have.property('category');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('Phoneno');
        res.body[0].should.have.property('_id');
        done();
      });
  });

  it('should add a developers contact on /contacts POST', function (done) {
    chai.request(server)
      .post('/contacts')
      .send({
        'firstname': 'Paul', 'lastname': 'Oluyege',
        'nickname': 'Paulappz', 'category': 'fullstack',
        'email': 'pauloluye@gmail.com', 'Phoneno': 08068492563
      })
      .end(function (err, res) {
        // the res object should have a status of 201
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('firstname');
        res.body.should.have.property('lastname');
        res.body.should.have.property('nickname');
        res.body.should.have.property('category');
        res.body.should.have.property('email');
        res.body.should.have.property('Phoneno');
        res.body.should.have.property('_id');
        res.body.firstname.should.equal('Paul');
        res.body.lastname.should.equal('Oluyege');
        res.body.nickname.should.equal('Paulappz');
        res.body.category.should.equal('fullstack');
        res.body.email.should.equal('pauloluye@gmail.com');
        res.body.Phoneno.should.equal(8068492563);
        done();
      });
  });

  it('should list a developer contact details on /contact/<contactid> GET', function (done) {
    var newContact = new Contact({
      firstname: 'Paul',
      lastname: 'Oluyege',
      nickname: 'Paulappz',
      category: 'fullstack',
      email: 'pauloluyege@gmail.com',
      Phoneno: 08068492563
    });
    newContact.save(function (err, data) {
      chai.request(server)
        .get('/contact/' + data.id)
        .end(function (err, res) {
          // the res object should have a status of 200
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('firstname');
          res.body.should.have.property('lastname');
          res.body.should.have.property('nickname');
          res.body.should.have.property('category');
          res.body.should.have.property('email');
          res.body.should.have.property('Phoneno');
          res.body.should.have.property('_id');
          res.body.firstname.should.equal('Paul');
          res.body.lastname.should.equal('Oluyege');
          res.body.nickname.should.equal('Paulappz');
          res.body.category.should.equal('fullstack');
          res.body.email.should.equal('pauloluyege@gmail.com');
          res.body.Phoneno.should.equal(8068492563);
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });

  it('should update a developer contact detail on /contact/<contactid> PUT', function (done) {
    chai.request(server)
      .get('/contacts')
      .end(function (err, res) {
        chai.request(server)
          .put('/contact/' + res.body[0]._id)
          // this is like sending $http.post or this.http.post in Angular
          .send({
            'firstname': 'Paul', 'lastname': 'Oluyege',
            'nickname': 'Paulappz', 'category': 'fullstack',
            'email': 'paul@gmail.com', 'Phoneno': 08068492563
          })
          // when we get a response from the endpoint
        // in other words,
          .end(function (error, response) {
            // the res object should have a status of 200
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('firstname');
            response.body.should.have.property('lastname');
            response.body.should.have.property('nickname');
            response.body.should.have.property('category');
            response.body.should.have.property('email');
            response.body.should.have.property('Phoneno');
            response.body.should.have.property('_id');
            response.body.firstname.should.equal('Paul');
            response.body.lastname.should.equal('Oluyege');
            response.body.nickname.should.equal('Paulappz');
            response.body.category.should.equal('fullstack');
            response.body.email.should.equal('paul@gmail.com');
            response.body.Phoneno.should.equal(8068492563);
            done();
          });
      });
  });

  // it('should  delete a developer contact detail on /contact/<contactid> DELETE without Auth Token', function (done) {
  //   chai.request(server)
  //     .get('/contacts')
  //     .end(function (err, res) {
  //       chai.request(server)
  //         .delete('/contact/' + res.body[0]._id)
  //         .end(function (error, response) {
  //           response.should.have.status(200);
  //           response.body.should.have.property('message');
  //           response.body.message.should.equal('Contact successfully deleted');
  //           done();
  //         });
  //     });
  // });

  it('should Register user, login user, check token and  delete a developer contact detail on /contact/<contactid> DELETE', function (done) {
    chai.request(server)
    // register request
      .post('/auth/register')
         // send user registration deatils
      .send({
        'fullName': 'Paul',
        'email': 'tester@email.com',
        'password': 'tester'
      }
      ) // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => { // when we get a response from the endpoint
        // in other words,
        // the res object should have a status of 201
        res.should.have.status(201);

        // follow up with login
        chai.request(server)
          .post('/auth/sign_in')
          // send user login deatils
          .send({
            'email': 'tester@email.com',
            'password': 'tester'
          })
          .end((err, res) => {
            console.log('this was run the login part');
            res.body.should.have.property('token');
            var token = res.body.token;
            // follow up with requesting user protected page
            chai.request(server)
              .get('/contacts')
              .end(function (err, res) {
                chai.request(server)
                  .delete('/contact/' + res.body[0]._id)
                  // we set the auth header with our token
                  .set('Authorization', 'JWT ' + token)
                  .end(function (error, response) {
                    response.should.have.status(200);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Authorized User, Action Successful!');
                    done();
                  })
              })

          })
      })
  })
})

