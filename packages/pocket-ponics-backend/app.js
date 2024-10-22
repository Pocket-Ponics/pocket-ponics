import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import routes from './routes/index.js';

const app = express();
const dotenv = require('dotenv')

const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
/**
    * Middleware
    */

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

var origins = ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(origins.indexOf(origin) === -1){
      var msg = 'CORS Policy - Denied';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});

/**
    * Register the routes
    */

routes(app);

export default app;
