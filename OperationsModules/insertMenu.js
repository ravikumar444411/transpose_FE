let express = require('express');
let Kafka = require('node-rdkafka');
let menuProducer = require('../Kafka/producer');
let menuConsumer = require('../Kafka/consumer');

// Kafka producer and consumer
// for Menu collection 
// connected 
menuProducer.connect();
menuConsumer.connect();

module.exports = (details) => {

  // producer pushing data into Kafka
  menuProducer.on('ready', function () {
    try {
      menuProducer.produce(
        "Test-Topics4",
        null,
        Buffer.from(JSON.stringify(details))
      );

    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });

  // producer error handling
  menuProducer.on('event.error', function (err) {
    console.error('Error from producer : ');
    console.error(err);
  });

  // consumer accessing the data from Kafka topic
  menuConsumer
    .on('ready', function () {
      menuConsumer.subscribe(['Test-Topics4']);
      menuConsumer.consume();
    });

};