import {PdfCreator} from "./pdf-creator";
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/pdf/:hash', (req, res) => {
  let pdfCreator = new PdfCreator();
  let html = pdfCreator.getHTML(req.body.data);
  res.send(html);
});
