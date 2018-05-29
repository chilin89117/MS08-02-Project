# MS08-02-Project

![a](../assets/a.png?raw=true)

![b](../assets/b.png?raw=true)

![c](../assets/c.png?raw=true)

* ### AoT: `$ npm run build:prod`
  * This does not work, runs into error: `Observable.js/Subscription.js has no id` ??? Maybe `jit` vs. `aot` issue. (see https://stackoverflow.com/questions/50581578/angular-6-webpack-production-build-error/50581964)
* ### `$ npm run build`
  * This works fine.
* ### `$ npm start`
* ### Components
  * app
    * header
    * `<router-outlet>`
      * msgs
        * msg-input
        * msg-list
          * msg
          * msg
          * ...
      * auth
        * `<router-outlet>`
          * register
          * login
          * logout
    * err
