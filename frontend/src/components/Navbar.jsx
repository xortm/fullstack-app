function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-600">
            全栈应用
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              你好，{user?.username}
            </span>

            <button
              onClick={onLogout}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
