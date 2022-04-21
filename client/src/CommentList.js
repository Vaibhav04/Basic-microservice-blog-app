import React from 'react';

const CommentList = ({ comments }) => {
  const commentMarkup = comments.map((comment) => {
    console.log(comment);
    let content;

    if (comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'pending') {
      content = 'This comment is awaiting approval';
    } else {
      content = 'This comment is rejected';
    }
    return <li key={comment.id}>{content}</li>;
  });
  return <div>{commentMarkup}</div>;
};

export default CommentList;
