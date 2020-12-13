const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Give me back the comments from the post id given in URL, otherwise
  // just return an empty array.
  const comments = commentsByPostId[req.params.id] || [];

  // Push in the new comment we are trying to great into the array.
  comments.push({ id: commentId, content });

  // Assign comments array back to the given post by post id.
  commentsByPostId[req.params.id] = comments;

  // Send back entire array of comments
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});