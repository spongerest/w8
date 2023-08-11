import express = require('express');


import * as bodyParser from 'body-parser';
import  routes from './routes';

const back = express();
const port = 3000;


back.use(bodyParser.json());

back.use('/api', routes);

back.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
});

