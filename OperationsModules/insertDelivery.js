let express = require('express');
let Kafka = require('node-rdkafka');
let deliveryProducer = require('../Kafka/producer');
let deliveryConsumer = require('../Kafka/consumer');

handoverProducer.connect();
handoverConsumer.connect();

module.exports = (details)=> {
    
    deliveryProducer.on('ready', function() {
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

    deliveryProducer.on('event.error', function(err) {
        console.error('Error from producer : ');
        console.error(err);
    });

    deliveryConsumer
    .on('ready', function() {
      deliveryConsumer.subscribe(['Test-Topics2']);
      deliveryConsumer.consume();
    })
    .on('data', function(data) {
      // console.log(data);
    });

};