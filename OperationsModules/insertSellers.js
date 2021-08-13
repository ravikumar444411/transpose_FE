let express = require('express');
// let Kafka = require('node-rdkafka');
let sellersProducer = require('../Kafka/producer');
// let sellersConsumer = require('../Kafka/consumer');

// Kafka producer and consumer
// for Sellers collection 
// connected 
// sellersProducer.connect();
// sellersConsumer.connect();

module.exports = (details) => {

  sellersProducer(details, "Test-Topics7");
  // producer pushing data into Kafka
  // sellersProducer.on('ready', function () {
  //   try {
  //     sellersProducer.produce(
  //       "Test-Topic7",
  //       null,
  //       Buffer.from(JSON.stringify(details))
  //     );

  //   } catch (err) {
  //     console.error('A problem occurred when sending our message');
  //     console.error(err);
  //   }
  // });

  // // producer error handling
  // sellersProducer.on('event.error', function (err) {
  //   console.error('Error from producer : ');
  //   console.error(err);
  // });

  // // consumer accessing the data from Kafka topic
  // sellersConsumer
  //   .on('ready', function () {
  //     sellersConsumer.subscribe(['Test-Topic7']);
  //     sellersConsumer.consume();
  //   });
};