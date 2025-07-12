// src/components/PostsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <ul data-testid="posts-list">
        {posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
