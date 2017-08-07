import {PdfCreator} from "./pdf-creator";
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

let app = express();
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('PDF app listening on port 3000!');
});

app.post('/pdf/:hash', (req, res) => {
  PdfCreator.getPDF(req.body.data, (err, buffer) => {
    if (err) {
      console.error(err);
      return;
    }

    res.contentType('application/pdf');
    res.end(buffer);
  });
});
