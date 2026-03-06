import { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        // 注册
        const response = await axios.post('/auth/register', {
          username,
          email,
          password
        });
        onLogin(response.data.user, response.data.token);
      } else {
        // 登录
        const response = await axios.post('/auth/login', {
          username,
          password
        });
        onLogin(response.data.user, response.data.token);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || '操作失败');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isRegister ? '注册' : '登录'}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">用户名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
        >
          {isRegister ? '注册' : '登录'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setIsRegister(!isRegister)}
        className="w-full mt-4 text-purple-500 hover:text-purple-600"
      >
        {isRegister ? '已有账号？点击登录' : '没有账号？点击注册'}
      </button>
    </div>
  );
}

export default Login;
