import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/persons', (_req, _res)=>{
    const persons = [
        { id: 1, name:'nahara'},
        { id: 2, name:'Sasha'},
        { id: 3, name:'Lenon'},    
    ]

    _res.json(persons);
})

app.listen(port, () => console.log(`|o| yupiii!! your node api seed is now listening on port ${port}`));