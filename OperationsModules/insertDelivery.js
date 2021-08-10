let express = require('express');
let Kafka = require('node-rdkafka');
let deliveryProducer = require('../Kafka/producer');
let deliveryConsumer = require('../Kafka/consumer');

// Kafka producer and consumer
// for Delivery collection 
// connected 
deliveryProducer.connect();
deliveryConsumer.connect();

module.exports = (details) => {
  // producer pushing data into Kafka
  deliveryProducer.on('ready', function () {
    try {
      deliveryProducer.produce(
        "Test-Topics2",
        null,
        Buffer.from(JSON.stringify(details))
      );

    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });

  // producer error handling
  deliveryProducer.on('event.error', function (err) {
    console.error('Error from producer : ');
    console.error(err);
  });

  // consumer accessing the data from Kafka topic
  deliveryConsumer
    .on('ready', function () {
      deliveryConsumer.subscribe(['Test-Topics2']);
      deliveryConsumer.consume();
    });

};