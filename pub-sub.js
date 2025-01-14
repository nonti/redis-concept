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
    // const subscriber  = client.duplicate(); // create a new subscriber share the same connection
    // await subscriber.connect(); //connect to redis server for the subcriber
    // await subscriber.subscribe('dummy-channel', (message, channel) =>{
    //   console.log(`Received message: ${message} from channel: ${channel}`);
    // });

    // //Publish message to the dummy channel
    // await client.publish('dummy-channel', 'Some dummy data from the publisher');
    // await client.publish('dummy-channel', 'New dummy data from the publisher');

    // await new Promise((resolve) => setTimeout(resolve,5000));
    // await subscriber.unsubscribe('dummy-channel');
    // await subscriber.quit(); // close the subscriber connection

    //pipelining and transactions
    // const multi = client.multi();
    // multi.set('key transactions -1','value 1')
    // multi.set('key transactions -2','value 2');
    // multi.get('key transactions -1');
    // multi.get('key transactions -2');

    // const result = await multi.exec();
    // console.log(result);

    // const pipeline = client.multi();
    // pipeline.set('key pipeline -1','value 1');
    // pipeline.set('key pipeline -2','value 2');
    // pipeline.get('key pipeline -1');
    // pipeline.get('key pipeline -2');

    // const pipelineResult = await multi.exec();
    // console.log(pipelineResult);

    // //batch data operations
    // const batchPipeline = client.multi();
    // for(let i = 0; i < 1000; i++){
    //   batchPipeline.set(`user ${i}: action`, `Action ${i}`);
    // }

    // await batchPipeline.exec();

    // //transactions
    // const dummyExample = client.multi();
    // multi.decrBy('account: 1234:balance', 100);
    // multi.incrBy('account: 0000:balance', 100);

    // const transactionResult = await multi.exec();
    // console.log(transactionResult);

    // const cartExample = client.multi();
    // multi.hIncrBy('cart:12345','item_count' ,1)
    // multi.hIncrBy('cart:12345','total_price', 10);

    // await multi.exec();

    console.log('Performance test');
    console.time('without pipelining');

    for(let i = 0; i < 1000; i++){
      await client.set(`user:${i}`,`user_value:${i}`);
    }

    console.timeEnd('without pipelining');
    const bigPipeline = client.multi();

    console.time('with pipelining');

    for(let i = 0; i < 1000; i++){
      bigPipeline.set(`user_pipeline:${i}`,`user_pipeline_value:${i}`);
    }

   
    await bigPipeline.exec();
    console.timeEnd('with pipelining');

  } catch (error) {
    console.log('Redis client error occured', error);
  }finally {
    client.quit();
  }
}

addtionalFeatures();