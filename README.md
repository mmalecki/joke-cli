# joke-cli

CLI logger for [`joke`](https://github.com/mmalecki/joke).

![Screenshot](http://i.imgur.com/EwTP4yR.png)

## Installation

```sh
npm install joke-cli
```

## Usage
```js
var joke = require('joke')();
var JokeCLI = require('joke-cli');

joke.pipe(JokeCLI());

joke.info('hello, world', { foo: true });
```
