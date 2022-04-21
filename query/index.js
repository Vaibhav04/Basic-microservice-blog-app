const express = require('express'),
  cors = require('cors'),
  axios = require('axios'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
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
};

app.get('/posts', (req, res) => {
  res.send(posts);
});
app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);

  res.send({});
});

app.listen(3003, async () => {
  console.log('listening on 3003');
  try {
    const res = await axios.get('http://localhost:3004/events');
    for (const event of res.data) {
      console.log('Processing', event.type);
      handleEvents(event.type, event.data);
    }
  } catch (error) {
    console.log(error);
  }
});
