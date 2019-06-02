import bodyParser = require('body-parser');
import express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
