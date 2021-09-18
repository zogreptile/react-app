const express = require('express');
const app = express();

app.all('*', function (req, res) {
  try {
    enableCors(res);

    if (Object.keys(req.query).length === 0) {
      res.status(400).json({ message: 'Query parameters are required.' });
    } else {
      res.send({ ...req.query });
    }
  } catch (error) {
    console.log('🔴', error);
  }
})

app.listen(3005, () => console.log('server running on port 3005 '));

function enableCors(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
}
