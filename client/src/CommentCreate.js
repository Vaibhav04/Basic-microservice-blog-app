import React, { useState } from 'react';
import axios from 'axios';
const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');
  const submitComment = async (e) => {
    e.preventDefault();
    const comment = await axios.post(
      `http://localhost:3001/posts/${postId}/comments`,
      { content }
    );
    console.log(comment.data);
  };
  return (
    <div className="">
      <form onSubmit={submitComment}>
        <div className="form-group">
          <label htmlFor="comment">New Comment</label>
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
