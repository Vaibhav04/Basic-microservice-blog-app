import React from 'react';

const CommentList = ({ comments }) => {
  const commentMarkup = comments.map((comment) => {
    console.log(comment);
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <div>{commentMarkup}</div>;
};

export default CommentList;
