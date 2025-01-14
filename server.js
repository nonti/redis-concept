import redis from 'redis';

const client = redis.createClient({
  host: 'loclahost',
  port: 6379
});


//Event Listener
client.on('error', (err) => console.log('Redis Client Error', err));

const testRedisConnection = async() => {
  try{
    await client.connect()
    console.log('Connected to Redis');

    await client.set('name', 'noty');
    const extractValue = await client.get('key');
    console.log(extractValue);

    const deleteCount = await client.del('key');
    console.log(deleteCount);

    const extractValueUpdate = await client.get('key');
    console.log(extractValueUpdate);

    await client.set('count', '100')
    const incrementedValue = await client.incr('count');
    console.log(incrementedValue);

    const decrementedValue = await client.decr('count');
    console.log(decrementedValue);
    
  }catch(error){
    console.error(error);
  }finally{
    await client.quit();
  }
}

testRedisConnection();