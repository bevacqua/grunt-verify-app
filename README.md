# grunt-verify-app

> Verifies an application listens on a port when spawned

```shell
npm install --save-dev grunt-verify-app
```

## Configuration

Here are the defaults

```js
verify_app: {
    server: {
        options: {
            script: 'app',
            port: 3000,
            timeout: 10000, // how long before giving up
            frequency: 1000 // how often to check the port
        }
    }
}
```

Run it!

```shell
grunt verify_app:server
```

## In action

![verification.png][1]

If the verification times out, the task is _considered a failure_.

## License

MIT

  [1]: http://i.stack.imgur.com/oZxaJ.png
