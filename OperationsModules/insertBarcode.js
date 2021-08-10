let express = require('express');
let Kafka = require('node-rdkafka');
let barcodeProducer = require('../Kafka/producer');
let barcodeConsumer = require('../Kafka/consumer');

barcodeProducer.connect();
barcodeConsumer.connect();

module.exports = (details) => {

    barcodeProducer.on('ready', function() {
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
    
      barcodeProducer.on('event.error', function(err) {
          console.error('Error from producer : ');
          console.error(err);
      });
    
      barcodeConsumer
      .on('ready', function() {
        barcodeConsumer.subscribe(['Test-Topics1']);
        barcodeConsumer.consume();
      })
      .on('data', function(data) {
        // console.log(data);
      });

};