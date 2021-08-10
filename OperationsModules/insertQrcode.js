let express = require('express');
let Kafka = require('node-rdkafka');
let qrcodeProducer = require('../Kafka/producer');
let qrcodeConsumer = require('../Kafka/consumer');

// Kafka producer and consumer
// for Qrcode collection 
// connected 
qrcodeProducer.connect();
qrcodeConsumer.connect();

module.exports = (details) => {

  // producer pushing data into Kafka
  qrcodeProducer.on('ready', function () {
    try {
      qrcodeProducer.produce(
        "Test-Topics6",
        null,
        Buffer.from(JSON.stringify(details))
      );

    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });

  // producer error handling
  qrcodeProducer.on('event.error', function (err) {
    console.error('Error from producer : ');
    console.error(err);
  });

  // consumer accessing the data from Kafka topic
  qrcodeConsumer
    .on('ready', function () {
      qrcodeConsumer.subscribe(['Test-Topics6']);
      qrcodeConsumer.consume();
    });
};