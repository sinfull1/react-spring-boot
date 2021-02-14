const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'demo-client',


    brokers: ["http://ec2-13-232-52-62.ap-south-1.compute.amazonaws.com:9092"],
    port: "9092"
})


const runner =  async function () {
    const consumer = kafka.consumer({ groupId: 'test-group' })

   await  consumer.connect()
   await  consumer.subscribe({ topic: 'demo-topic', fromBeginning: true })

   await  consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    });
}

runner();