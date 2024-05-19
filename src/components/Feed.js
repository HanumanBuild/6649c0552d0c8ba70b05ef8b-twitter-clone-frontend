import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Defining the Feed component
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_TWITTER_CLONE_BACKEND_URL}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_TWITTER_CLONE_BACKEND_URL}/posts`, { content: newPost });
      setNewPost('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Rendering the component
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Twitter Clone</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="3"
          placeholder="What's happening?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
      </form>
      <div>
        {posts.map((post, index) => (
          <div key={index} className="border-b border-gray-200 py-2">
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporting the Feed component
export default Feed;