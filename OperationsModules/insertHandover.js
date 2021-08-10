let express = require('express');
let Kafka = require('node-rdkafka');
let handoverProducer = require('../Kafka/producer');
let handoverConsumer = require('../Kafka/consumer');

// Kafka producer and consumer
// for Handover collection 
// connected 
handoverProducer.connect();
handoverConsumer.connect();

module.exports = (details) => {

  // producer pushing data into Kafka
  handoverProducer.on('ready', function () {
    try {
      handoverProducer.produce(
        "Test-Topics3",
        null,
        Buffer.from(JSON.stringify(details))
      );

    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });

  // producer error handling
  handoverProducer.on('event.error', function (err) {
    console.error('Error from producer : ');
    console.error(err);
  });

  // consumer accessing the data from Kafka topic
  handoverConsumer
    .on('ready', function () {
      handoverConsumer.subscribe(['Test-Topics3']);
      handoverConsumer.consume();
    });

};