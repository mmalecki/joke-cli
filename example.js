var joke = require('joke')({ level: 'debug' });
var JokeCLI = require('./');

joke.pipe(JokeCLI());

joke.info('hello, world!', { foo: 'bar', trzy: 3 });
joke.warn('this is not working out');
joke.error('we should see other people', { err: new Error('foo bar') });

joke.debug('this is a bigger data structure', {
  server: 'fe-90-us-east-1',
  url: '/foo/bar',
  pid: 1345,
  user: 'baz',
  hosts: ['fe-89-us-east-1', 'fe-91-us-east-1'],
  data: {
    oneTwo: 'foo',
    testTest: 42
  }
});
