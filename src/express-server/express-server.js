var express = require('express')
var app = express()

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/local';

// Mongo Db
var db;

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, mongodb) {
  if (err) {
	console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
	  db = mongodb;
  }
});

app.get('/api/posts', function (req, res) {
	//HURRAY!! We are connected. :)
	console.log('Connection established to', url);

	// do some work here with the database.
	var collection = db.collection('xr_posts');
	var resp = "None"
	collection.find().toArray(function (err, result) {
		if (err) {
			console.log(err);
		} else if (result.length) {
			console.log('Found:', result);
			res.send(result);
		} else {
			console.log('No document(s) found with defined "find" criteria!');
		}
	});

	
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
