
let Kafka = require('node-rdkafka');

// Kafka Producer definition
const posting=(details,topic)=>{
    // console.log(details);
    let producer = new Kafka.Producer({
        'metadata.broker.list': 'localhost:9092', 
        'compression.codec': 'snappy',
        'message.send.max.retries': 20, // maximum retries for performing an operation before return failure
        'retry.backoff.ms': 200, 
        'socket.keepalive.enable': true,
        'batch.num.messages': 1000000,
        'queue.buffering.max.ms': 1000,
        'queue.buffering.max.messages': 10000000, // maximum capacity of kafka 
        'dr_cb': true
    });
    
    producer.connect();
    
    producer.on('ready', function () {
        try {
            producer.produce(
            topic,
            null,
            Buffer.from(JSON.stringify(details))
          );
    
        } catch (err) {
          console.error('A problem occurred when sending our message');
          console.error(err);
        }
      });
    
      // producer error handling
      producer.on('event.error', function (err) {
        console.error('Error from producer : ');
        console.error(err);
      });
    
    //   producer.disconnect();
}

module.exports = posting;