const express = require('express'),
  bodyParser = require('body-parser'),
  axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const event = req.body;

  try {
    //   Post service
    await axios.post('http://localhost:3000/events', event);
    //   Comment service
    await axios.post('http://localhost:3001/events', event);
    //   Moderation service
    await axios.post('http://localhost:3002/events', event);
    //   Query service
    await axios.post('http://localhost:3003/events', event);
  } catch (error) {
    console.log(error);
  }

  res.send({ status: 'OK' });
});

app.listen(3004, () => {
  console.log('listenning on port 3004');
});
