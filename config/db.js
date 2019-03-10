/*Its assumed that you have already created a mongodb atlas cluster 
Therefore, use the cluster credentials 
(username and password for mongodb atlas cluster) for this */

//install mongodb using 'npm install mongoose'

// Load mongoose module 
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

// Declare a variable named uri and assign MongoDB connection string
var uri = "mongodb://paulappz:asdfasdf@cluster0-shard-00-00-pirrw.mongodb.net:27017,cluster0-shard-00-01-pirrw.mongodb.net:27017,cluster0-shard-00-02-pirrw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// Declare a variable named option and assign optional settings

  const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10,
    useNewUrlParser:true,
    replicaSet: 'Cluster0-shard-0',
    useFindAndModify: false
  };

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );

