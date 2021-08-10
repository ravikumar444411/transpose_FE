let express = require('express');
let Kafka = require('node-rdkafka');
let authProducer = require('../Kafka/producer');
let authConsumer = require('../Kafka/consumer');

authProducer.connect();
authConsumer.connect();

module.exports = (details) => {

    authProducer.on('ready', function() {
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
  
    authProducer.on('event.error', function(err) {
        console.error('Error from producer : ');
        console.error(err);
    });
  
    authConsumer
    .on('ready', function() {
      authConsumer.subscribe(['Test-Topics']);
      authConsumer.consume();
    })
    .on('data', function(data) {
      // console.log(data);
    });

};