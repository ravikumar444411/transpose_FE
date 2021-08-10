
let Kafka = require('node-rdkafka');

// Kafka Producer definition
let producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092', 
    'compression.codec': 'gzip',
    'message.send.max.retries': 20, // maximum retries for performing an operation before return failure
    'retry.backoff.ms': 200, 
    'socket.keepalive.enable': true,
    'batch.num.messages': 1000000,
    'queue.buffering.max.ms': 1000,
    'queue.buffering.max.messages': 10000000, // maximum capacity of kafka 
    'dr_cb': true
});

module.exports = producer;