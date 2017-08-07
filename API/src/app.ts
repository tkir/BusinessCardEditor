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

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=test.pdf',
      'Content-Length': buffer.length
    });
    res.end(buffer, 'binary');
  });
});

app.post('/preview/:hash', (req, res) => {
  PdfCreator.getPreview(req.body.data, (err, buffer) => {
    if (err) {
      console.error(err);
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length
    });
    res.end(buffer, 'binary');
  });
});
