import KafkaConfig  from "../kafka/kafka.js"

const sendMessageToKafka = async (req, res) => {
    try {
        console.log("Sending message to kafka");
        const msg = req.body;
        const kafkaConfigClient = new KafkaConfig();
        const message = [
            {
                key : "key-1",
                value : JSON.stringify(msg) ,
            }
        ]
        const result = await kafkaConfigClient.produce("transcode", message);
        console.log("result of produce", result);
        res.status(200).send("Message sent to kafka");
    } catch (err) {
        console.error("Error sending message to kafka", err);
        res.status(500).send("Error sending message to kafka");
    } 
}

export default sendMessageToKafka;