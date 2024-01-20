import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(`http://localhost:8080/posts/${postId}`);
      const data = await response.json();
      setPost(data);
    }

    fetchPost();
  }, [postId]);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>User: {post.name}</p>
      {/* Add other details you want to display */}
    </div>
  );
}
