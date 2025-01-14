//pub -> publisher send message to channel
// sub -> subscriber will consume the message

import redis from 'redis';

const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

//Event Listener  
client.on('error', (err) => console.log('Redis Client Error', err));
const addtionalFeatures = async() => {
  try {
    await client.connect();

    //new client instance
    const subscriber  = client.duplicate(); // create a new subscriber share the same connection
    await subscriber.connect(); //connect to redis server for the subcriber
    await subscriber.subscribe('dummy-channel', (message, channel) =>{
      console.log(`Received message: ${message} from channel: ${channel}`);
    });

    //Publish message to the dummy channel
    await client.publish('dummy-channel', 'Some dummy data from the publisher');
    await client.publish('dummy-channel', 'New dummy data from the publisher');

    await new Promise((resolve) => setTimeout(resolve,5000));
    await subscriber.unsubscribe('dummy-channel');
    await subscriber.quit(); // close the subscriber connection

    //pipelining and transactions
    

  } catch (error) {
    console.log('Redis client erro occured', error);
  }finally {
    client.quit();
  }
}

addtionalFeatures();