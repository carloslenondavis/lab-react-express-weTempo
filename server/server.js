import express from 'express';
// import morgan from 'morgan';
import bodyParser from 'body-parser';
//class
import EndPoints from './endpoint';

const app = express();
const port = 5000;

// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(EndPoints);

app.listen(port, () => console.log(`|o| yupiii!! your node api seed is now listening on port ${port}`));