import { Kafka } from "kafkajs"

const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
})

const producer = kafka.producer()
const run = async () => {
    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Whats UP!' },
        ],
    })

}
run();
await producer.disconnect()


