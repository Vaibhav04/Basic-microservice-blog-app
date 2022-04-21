const express = require('express'),
  bodyParser = require('body-parser'),
  axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log(req.body);
  res.send({});
  if (type === 'CommentCreated') {
    const { id, postId, content } = data;
    const status = content.includes('orange') ? 'rejected' : 'approved';

    try {
      await axios.post('http://localhost:3004/events', {
        type: 'CommentModerated',
        data: {
          id,
          postId,
          content,
          status,
        },
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
});

app.listen(3002, () => {
  console.log('listening on 3002');
});
