const express = require('express'),
  bodyParser = require('body-parser'),
  axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Store events, so that when any service becomes unavailable in future it can process all these events when it comes back online.
const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;
  console.log(event);
  events.push(event);
  try {
    //   Post service
    await axios.post('http://localhost:3000/events', event);
    //   Comment service
    await axios.post('http://localhost:3001/events', event);
    //   Query service
    await axios.post('http://localhost:3003/events', event);
    //   Moderation service
    await axios.post('http://localhost:3002/events', event);
    res.send({ status: 'OK' });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

app.get('/events', (req, res) => {
  console.log(events);
  res.json(events);
});

app.listen(3004, () => {
  console.log('listenning on port 3004');
});
