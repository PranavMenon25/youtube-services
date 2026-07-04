import {Kafka} from 'kafkajs';
import fs from 'fs';
import path from 'path';

class KafkaConfig{
    constructor() {
        this.Kafka = new Kafka({
            clientId: "youtube-upload-service",
            brokers: [process.env.KAFKA_BROKER],
            ssl : {
                ca : [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")]
            },
            sasl : {
                username : process.env.KAFKA_USERNAME,
                password : process.env.KAFKA_PASSWORD,
                mechanism : "plain"
            }
        })
        this.producer = this.Kafka.producer();
        this.consumer = this.Kafka.consumer({groupId: ""});
    }

    async produce(topic, message){
        try{
            const result = await this.producer.connect();
            console.log("Kafka producer connected");
            await this.producer.send({
                topic: topic,
                messages: message
            });
            console.log("Message sent to Kafka topic:", topic);
        } catch(e){
            console.error("Error producing message to Kafka:", e);
        } finally{
            this.producer.disconnect();
        }
    }

    async consume(topic, callback){
        try{
            await this.consumer.connect();
            console.log("Kafka consumer connected");
            this.consumer.subscribe({topic: topic, fromBeginning: true});
            await this.consumer.run({
                eachMessage: async ({topic, partition, message}) => {
                    const msgValue = message.value.toString();
                    callback(msgValue);
                }
            });
        } catch(e){
            console.error("Error consuming message from Kafka:", e);
        } finally{
            await this.consumer.disconnect();
        }
    }
}

export default KafkaConfig;