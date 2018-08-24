# About

This is a typescript project for using the jsend-response-builder as Express.js middleware. It fully supports everything that the jsend-response-builder provides, through easy to use Express.js middleware functions.

# Usage

To use the middleware you simply import the default JSend function. Then use it as you would any other Express.js middleware. This middleware adds a jsend object to the Express.js Response object. It has 3 functions: success(), fail() and error(). 

### Example
```ts
// setup
import * as express from 'express';
import JSend from 'jsend-response-builder-express';

const app = express();

app.use(JSend({ 
    case: 'kebab',
    deep: true,
}));

// in route file 
...
const data = {
    message: 'hello world',
    firstName: 'Joe',
};

res.jsend.success(data, 200);

// response output
// 200 OK
// JSON body
// {
//     status: "success",
//     data: {
//          message: "hello world",
//          first-name: "Joe"
//     }
// }

```