import redis from 'redis';

const client = redis.createClient({
  host: 'loclahost',
  port: 6379
});


const dataStructure = async() => {
  try {

    await client.connect();
    //Strings SET,  GET, MSET, MGET
    await client.set('user:name', 'Nonty');
    const name = await client.get('name');
    // console.log(name);

    await client.mSet(['user:email', 'nonty@gmail.com', 'user:age','50','user:country','Thailand']);
    const [email, age, country] = await client.mGet(['user:email', 'user:age', 'user:country']);
    // console.log(email, age, country);

  //Lists LPUSH, RPUSH, LPOP, RPOP, LRANGE
  // await client.lPush('notes', ['note1', 'note2', 'note3']);
  // const extractNotes = await client.lRange('notes', 0, -1);
  // console.log(extractNotes);


  // const firstNote = await client.lPop('notes');
  // console.log(firstNote);

  // const remainingNotes = await client.lRange('notes', 0, -1);4
  // console.log(remainingNotes,'Remaining notes');

  // sets SADD, SMEM, SISMEMBER, SREM, SMEMBERS
    // await client.sAdd('user:nickName', ['joe', 'bob', 'alice']);
    // const extractUserNickNames = await client.sMembers('user:nickName');

    // console.log(extractUserNickNames);

    // const isBobUserName = await client.sIsMember('user:nickName', 'bob');
    // console.log(isBobUserName);

    // await client.sRem('user:nickName', 'alice');
    // const getUpdatedUserNickNames = await client.sMembers('user:nickName');
    // console.log(getUpdatedUserNickNames);

    //Sorted  sets ZADD, ZRANGE, ZRANGEBYSCORE, ZREM, ZRANK
  //   await client.zAdd('cart', [
  //     {
  //       score: 100, value: 'Cart 1'
  //     },
  //     {
  //       score: 150, value: 'Cart 2'
  //     },
  //     {
  //       score: 10, value: 'Cart 3'
  //     }
  // ]);

  // const getTopCartItems = await client.zRange('cart', 0, -1);
  // console.log(getTopCartItems);

  // const extractCartItems = await client.zRangeWithScores('cart', 0, -1);
  // console.log(extractCartItems);

  // const cartTwoRank = await client.zRank('cart', 'Cart 2');
  // console.log(cartTwoRank);

  //hashset HSET, HGET, HDEL, HGETALL
  await client.hSet('product', {
    name: 'Product 1',
    price: 100,
    description: 'This is product 1'
  });

  const getProductPrice = await client.hGet('product', 'price');
  console.log(getProductPrice);

  const getProduct = await client.hGetAll('product');
  console.log(getProduct);

  await client.hDel('product', 'price');
  const getProductAfterDelete = await client.hGetAll('product');
  console.log(getProductAfterDelete);
  
 } catch (error) {
    console.error(error);
  }finally{
    client.quit();
  }
}

dataStructure();