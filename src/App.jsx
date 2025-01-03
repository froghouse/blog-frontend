import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  // Set page title
  const NDASH_UNICODE = '\u2013';
  document.title = `Blog ${NDASH_UNICODE} Tomas Landberg`;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mt-8">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link 
          to="/create" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create New Post
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">
          No posts yet. Be the first to create one!
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {posts.map(post => (
              <article 
                key={post.id} 
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <Link to={`/post/${post.id}`}>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 ? '...' : ''}
                  </p>
                </Link>
              </article>
            ))}
          </div>

          {pagination && (
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.has_prev}
                className={`px-4 py-2 rounded ${
                  pagination.has_prev 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Previous
              </button>
              
              <span className="text-gray-600">
                Page {pagination.current_page} of {pagination.total_pages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.has_next}
                className={`px-4 py-2 rounded ${
                  pagination.has_next 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Updated SinglePost component with error handling
const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const NDASH_UNICODE = '\u2013';

  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    document.title = 'Loading...';
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mt-8">Loading...</div>
      </div>
    );
  }

  if (error) {
    document.title = `404 ${NDASH_UNICODE} Post not found`;
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-xl mb-4">Oops! This post doesn't exist.</p>
          <Link 
            to="/" 
            className="text-blue-500 hover:underline"
          >
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  document.title = `${post.title} ${NDASH_UNICODE} Tomas Landberg`;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link 
        to="/" 
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Posts
      </Link>
      <article className="mt-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="prose lg:prose-xl">
          {post.content}
        </div>
      </article>
    </div>
  );
};

// CreatePost component remains the same
const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const NDASH_UNICODE = '\u2013';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  document.title = `Create New Post ${NDASH_UNICODE} Tomas Landberg`;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link 
        to="/" 
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Posts
      </Link>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-2 border rounded h-48 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

// Main App component remains the same
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default App;