const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mUrl: process.env.MQTT_URL,
    kUrl: process.env.KAFKA_URL,
    options : {
        clientId: process.env.MQTT_ID,
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASS,
        clean: true
    },
    mTopic : process.env.MQTT_TOPIC,
    kTopic : process.env.KAFKA_TOPIC
}
