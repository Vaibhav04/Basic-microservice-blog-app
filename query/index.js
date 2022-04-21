const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});
app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(req.body);

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status, postId });
  }
  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
  res.send({});
});

app.listen(3003, () => {
  console.log('listening on 3003');
});
