let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

let app = express();
app.use(cors());
app.use(bodyParser.json());


let pdf = 'pdf';

app.get('/', (req, res) => {
  res.send('Hello API');
});

app.get('/pdf/:hash', (req, res) => {
  res.send(req.params.hash);
});

app.post('/pdf/:hash', (req, res)=>{
  res.send(req.body);
});

app.listen(4201, () => {
  console.log('API listen 4201');
});


function pdfCreator(obj) {

}
