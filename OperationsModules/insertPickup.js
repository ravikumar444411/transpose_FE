let express = require('express');
let Kafka = require('node-rdkafka');
let pickupProducer = require('../Kafka/producer');
let pickupConsumer = require('../Kafka/consumer');

// Kafka producer and consumer
// for Pickup collection 
// connected 
pickupProducer.connect();
pickupConsumer.connect();

module.exports = (details) => {

  // producer pushing data into Kafka
  pickupProducer.on('ready', function () {
    try {
      pickupProducer.produce(
        "Test-Topics5",
        null,
        Buffer.from(JSON.stringify(details))
      );

    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });

  // producer error handling
  pickupProducer.on('event.error', function (err) {
    console.error('Error from producer : ');
    console.error(err);
  });

  // consumer accessing the data from Kafka topic
  pickupConsumer
    .on('ready', function () {
      pickupConsumer.subscribe(['Test-Topics5']);
      pickupConsumer.consume();
    })
    .on('data', function (data) {
      // console.log(data);
    });
};