
let Kafka = require('node-rdkafka');

// Kafka Consumer definition
var consumer = new Kafka.KafkaConsumer({
    "group.id": 'kafka',
    'metadata.broker.list': 'localhost:9092' // broker details
}, {});



module.exports = consumer;