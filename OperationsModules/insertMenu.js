let express = require('express');
let Kafka = require('node-rdkafka');
let menuProducer = require('../Kafka/producer');
let menuConsumer = require('../Kafka/consumer');

menuProducer.connect();
menuConsumer.connect();

module.exports = (details) => {

    menuProducer.on('ready', function() {
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
    
      menuProducer.on('event.error', function(err) {
        console.error('Error from producer : ');
        console.error(err);
      });
    
      menuConsumer
      .on('ready', function() {
      menuConsumer.subscribe(['Test-Topics4']);
      menuConsumer.consume();
      })
      .on('data', function(data) {
      // console.log(data);
      });

};