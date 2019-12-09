// CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb');

const id = new ObjectID()
console.log(id)

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to the database!');
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne(
    //   {
    //     name: 'Ibra',
    //     age: 31
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection('users').insertMany(
    //   [
    //     {
    //       name: 'Lisa',
    //       age: 23
    //     },
    //     {
    //       name: 'Pape',
    //       age: 35
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert documents!');
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection('tasks').insertMany(
    //   [
    //     {
    //       description: 'Learn node',
    //       completed: false
    //     },
    //     {
    //       description: 'make my cv',
    //       completed: true
    //     },
    //     {
    //       description: 'master JavaScript',
    //       completed: false
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert tasks!');
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection('users').updateOne({
    //   _id: new ObjectID('5ded804eece7125e0578be56')
    // }, {
    //   $set: {
    //     name: 'Mouf'
    //   }
    // }).then((result)=> {
    //   console.log(result)
    // }).catch((error)=> {
    //   console.log(error)
    // })

    // db.collection('users').updateOne({
    //   _id: new ObjectID('5ded804eece7125e0578be56')
    // }, {
    //   $inc: {
    //     age: 1
    //   }
    // }).then((result)=> {
    //   console.log(result)
    // }).catch((error)=> {
    //   console.log(error)
    // })

    db.collection('tasks').updateMany({
      completed: false
    }, {
      $set: {
        completed: true
      }
    }).then((result)=> {
      console.log(result)
    }).catch((error)=> {
      console.log(error)
    })


  }
);
