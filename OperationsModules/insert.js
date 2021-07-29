
let express = require('express');
let User = require('../Models/authModel');
// let Kafka = require('node-rdkafka');
// let producer = require('../Kafka/producer');
// let consumer = require('../Kafka/consumer');

// producer.connect();
// consumer.connect();

// module.exports =  function(details) {

//   producer.on('ready', function() {
//       try {
//         producer.produce(
//           "Test-Topics",
//           null,
//           Buffer.from(JSON.stringify(details))
//         );

//       } catch (err) {
//         console.error('A problem occurred when sending our message');
//         console.error(err);
//       }
//   });

//   producer.on('event.error', function(err) {
//       console.error('Error from producer : ');
//       console.error(err);
//   });

//   consumer
//   .on('ready', function() {
//     consumer.subscribe(['Test-Topics']);
//     consumer.consume();
//   })
//   .on('data', function(data) {
//     // console.log(data);
//   });

// }

module.exports = function(req,res,details) {
  let user = new User(details);

  user.save((err,record)=> {
    if(err) {
      res.status(400).send("Cannot create user");
    } else {
      console.log(record);
      res.status(200).send("User created!");
    }
  });
}