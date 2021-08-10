let express = require('express');
let Kafka = require('node-rdkafka');
let authProducer = require('../Kafka/producer');
let authConsumer = require('../Kafka/consumer');

// Kafka producer and consumer
// for User collection 
// connected 
authProducer.connect();
authConsumer.connect();

module.exports = (details) => {

  // producer pushing data into Kafka
  authProducer.on('ready', function () {
    try {
      authProducer.produce(
        "Test-Topics",
        null,
        Buffer.from(JSON.stringify(details))
      );

    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });

  // producer error handling
  authProducer.on('event.error', function (err) {
    console.error('Error from producer : ');
    console.error(err);
  });

  // consumer accessing the data from Kafka topic
  authConsumer
    .on('ready', function () {
      authConsumer.subscribe(['Test-Topics']);
      authConsumer.consume();
    });

};