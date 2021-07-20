
let Kafka = require('node-rdkafka');

let producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    'compression.codec': 'gzip',
    'message.send.max.retries': 20,
    'retry.backoff.ms': 200,
    'socket.keepalive.enable': true,
    'batch.num.messages': 1000000,
    'queue.buffering.max.ms': 1000,
    'queue.buffering.max.messages': 10000000,
    'dr_cb': true
});

module.exports = producer;