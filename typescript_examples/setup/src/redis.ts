// import tedis from 'tedis';
import { Tedis } from 'tedis';
// const tedis = require('tedis')
const client = new Tedis({
  host: '127.0.0.1',
  port: 6379,
});

client.on('connect', async () => {
  console.log('connect');
  await client.command('SET', 'mykey', 'hello 刘晓东, 你好 sdfsdf');
  let res = await client.command('GET', 'mykey');

  console.log(res);

  client.close();
});
