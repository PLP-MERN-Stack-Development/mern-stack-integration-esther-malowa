import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    body: "",
    excerpt: "",
    author: "",
    category: "",
    tags: "",
    featuredImage: "",
    published: false,
  });

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        const data = res.data;

        setPost({
          ...data,
          tags: data.tags ? data.tags.join(", ") : "",
        });
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost({
      ...post,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = {
        ...post,
        tags: post.tags.split(",").map((tag) => tag.trim()),
      };
      await api.put(`/posts/${id}`, updatedPost);
      alert("Post updated successfully!");
      navigate("/posts");
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Post Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="body"
          value={post.body}
          onChange={handleChange}
          placeholder="Post Body"
          className="w-full border p-2 rounded h-40"
          required
        />
        <textarea
          name="excerpt"
          value={post.excerpt}
          onChange={handleChange}
          placeholder="Short Excerpt"
          className="w-full border p-2 rounded h-20"
        />
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={post.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="tags"
          value={post.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded"
        />
        <div>
  <label className="block mb-2 font-medium">Featured Image</label>

  {/* Show current image if it exists */}
  {post.featuredImage && (
    <div className="mb-3">
      <p className="text-sm text-gray-600 mb-1">Current Image:</p>
      <img
        src={
          post.featuredImage.startsWith("http")
            ? post.featuredImage
            : `/uploads/${post.featuredImage}`
        }
        alt="Current featured"
        className="w-48 h-32 object-cover rounded border"
      />
    </div>
  )}

  {/* Show URL input */}
  <input
    type="text"
    name="featuredImage"
    value={post.featuredImage}
    onChange={handleChange}
    placeholder="Enter image URL or upload below"
    className="w-full border p-2 rounded mb-2"
  />

  {/* Option to upload new file */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setPost({ ...post, featuredImage: e.target.files[0] })
    }
    className="w-full border p-2 rounded"
  />
</div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="published"
            checked={post.published}
            onChange={handleChange}
          />
          <span>Published</span>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
