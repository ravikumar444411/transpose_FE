let express = require('express');
let Kafka = require('node-rdkafka');
let barcodeProducer = require('../Kafka/producer');
let barcodeConsumer = require('../Kafka/consumer');

// Kafka producer and consumer
// for Barcode collection 
// connected 
barcodeProducer.connect();
barcodeConsumer.connect();

module.exports = (details) => {

  // producer pushing data into Kafka
  barcodeProducer.on('ready', function () {
    try {
      barcodeProducer.produce(
        "Test-Topics1",
        null,
        Buffer.from(JSON.stringify(details))
      );

    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });

  // producer error handling
  barcodeProducer.on('event.error', function (err) {
    console.error('Error from producer : ');
    console.error(err);
  });

  // consumer accessing the data from Kafka topic
  barcodeConsumer
    .on('ready', function () {
      barcodeConsumer.subscribe(['Test-Topics1']);
      barcodeConsumer.consume();
    });

};