import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ user, token }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts');
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(
        '/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle('');
      setContent('');
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || '创建失败');
    }
  };

  const deletePost = async (postId) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      await axios.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 创建文章表单 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">创建新文章</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={createPost}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
          >
            创建文章
          </button>
        </form>
      </div>

      {/* 文章列表 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">文章列表</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">暂无文章</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.content}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    作者: {post.username}
                  </span>
                  <span>
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                </div>

                {post.user_id === user.id && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    删除
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
