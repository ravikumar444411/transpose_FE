let express = require('express');
let Kafka = require('node-rdkafka');
let handoverProducer = require('../Kafka/producer');
let handoverConsumer = require('../Kafka/consumer');

handoverProducer.connect();
handoverConsumer.connect();

module.exports = (details) => {

    handoverProducer.on('ready', function() {
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
  
    handoverProducer.on('event.error', function(err) {
        console.error('Error from producer : ');
        console.error(err);
    });
  
    handoverConsumer
    .on('ready', function() {
      handoverConsumer.subscribe(['Test-Topics3']);
      handoverConsumer.consume();
    })
    .on('data', function(data) {
      // console.log(data);
    });

};