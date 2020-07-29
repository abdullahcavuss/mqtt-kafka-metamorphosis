const mqtt = require('mqtt'),
url = require('./config').url,
options = require('./config').options,
topic_s = require('./config').topic,
kafka = require('kafka-node'),
Producer = kafka.Producer,
kafkaPort = require('./config').kafkaPort,
client = new kafka.KafkaClient({kafkaHost: url + kafkaPort}),
producer = new Producer(client);


let mqttClient = mqtt.connect(url,options)

mqttClient.on("connect",function(){
    console.log("Mqtt Connected")
})

mqttClient.subscribe(topic_s,{qos:1})

mqttClient.on('message',function(topic, message, packet){
    producer.on("ready", function() {
        console.log("ready");
        setInterval(function() {
          payloads = [
            { topic: "testTopic", messages: message.toString(), partition: 0 }
          ];
      
          producer.send(payloads, function(err, data) {
            console.log(data);
            count += 1;
          });
        }, 500);
      });
})