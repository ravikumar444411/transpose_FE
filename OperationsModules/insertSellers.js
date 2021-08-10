let express = require('express');
let Kafka = require('node-rdkafka');
let sellersProducer = require('../Kafka/producer');
let sellersConsumer = require('../Kafka/consumer');

sellersProducer.connect();
sellersConsumer.connect();

module.exports = (details) => {

    sellersProducer.on('ready', function() {
        try {
          sellersProducer.produce(
            "Test-Topic7",
            null,
            Buffer.from(JSON.stringify(details))
          );
    
        } catch (err) {
          console.error('A problem occurred when sending our message');
          console.error(err);
        }
      });
    
      sellersProducer.on('event.error', function(err) {
        console.error('Error from producer : ');
        console.error(err);
      });
    
      sellersConsumer
      .on('ready', function() {
      sellersConsumer.subscribe(['Test-Topic7']);
      sellersConsumer.consume();
      })
      .on('data', function(data) {
      // console.log(data);
      });

};