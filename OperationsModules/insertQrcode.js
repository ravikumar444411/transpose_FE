let express = require('express');
let Kafka = require('node-rdkafka');
let qrcodeProducer = require('../Kafka/producer');
let qrcodeConsumer = require('../Kafka/consumer');

qrcodeProducer.connect();
qrcodeConsumer.connect();

module.exports = (details) => {
    qrcodeProducer.on('ready', function() {
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
    
      qrcodeProducer.on('event.error', function(err) {
        console.error('Error from producer : ');
        console.error(err);
      });
    
      qrcodeConsumer
      .on('ready', function() {
      qrcodeConsumer.subscribe(['Test-Topics6']);
      qrcodeConsumer.consume();
      })
      .on('data', function(data) {
      // console.log(data);
      });
};