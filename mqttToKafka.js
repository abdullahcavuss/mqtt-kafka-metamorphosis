const mqtt = require('mqtt'),
mUrl = require('./config').mUrl,
mTopic = require('./config').mTopic,
options = require('./config').options,
kUrl = require('./config').kUrl,
kTopic = require('./config').kTopic,
kafka = require('kafka-node'),
Producer = kafka.Producer,
client = new kafka.KafkaClient({kafkaHost: kUrl }),
producer = new Producer(client);

let mqttClient = mqtt.connect(mUrl,options)

mqttClient.on("connect",function(){
    console.log("Mqtt Connected")
})

mqttClient.subscribe(mTopic,{qos:1})

producer.on("ready", function() {
  console.log("ready");
  mqttClient.on('message',function(topic, message, packet){
    payloads = [
      { topic: kTopic, messages: message.toString(), partition: 0 }
    ];
  
    producer.send(payloads, function(err, data) {
      console.log(data);
      console.log(err);
    });
  })
});