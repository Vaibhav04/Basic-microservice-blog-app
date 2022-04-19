const express = require('express'),
  bodyParser = require('body-parser'),
  axios = require('axios');
const cors = require('cors');

const { randomBytes } = require('crypto');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios.post('http://localhost:3004/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  console.log(req.body);

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  const event = req.body;
  console.log(event);
  res.json({});
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
