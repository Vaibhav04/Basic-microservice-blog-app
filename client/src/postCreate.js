import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const submitFormHandler = async (e) => {
    e.preventDefault();
    console.log(title);
    const post = await axios.post('http://localhost:3000/posts', { title });
    console.log(post);
    setTitle('');
  };
  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
