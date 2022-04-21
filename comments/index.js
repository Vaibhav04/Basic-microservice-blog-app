const express = require('express'),
  bodyParser = require('body-parser'),
  axios = require('axios'),
  cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comment = {
    id,
    content,
    status: 'pending',
  };
  const comments = commentsByPostId[req.params.id] || [];
  comments.push(comment);

  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);

  await axios.post('http://localhost:3004/events', {
    type: 'CommentCreated',
    data: {
      id,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });
});

app.post('/events', async (req, res) => {
  const event = req.body;
  console.log(event);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    try {
      await axios.post('http://localhost:3004/events', {
        type: 'CommentUpdated',
        data: {
          id,
          content,
          postId,
          status,
        },
      });
    } catch (error) {
      res.json(error);
    }
  }

  res.json({});
});

app.listen(3001, () => {
  console.log('Listening on 3001');
});
