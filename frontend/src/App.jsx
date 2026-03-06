import React from 'react';

function App() {
  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'
  }, 
    React.createElement('div', {
      className: 'bg-white rounded-lg shadow-lg p-8 max-w-md'
    },
      React.createElement('h1', {
        className: 'text-2xl font-bold text-center mb-4'
      }, '全栈应用'),
      
      React.createElement('p', {
        className: 'text-gray-600 text-center mb-4'
      }, '这是一个完整的全栈应用示例'),
      
      React.createElement('div', {
        className: 'text-center'
      },
        React.createElement('p', {
          className: 'text-sm text-gray-500 mb-2'
        }, '技术栈：'),
        
        React.createElement('ul', {
          className: 'text-left text-sm space-y-1'
        },
          React.createElement('li', null, '✅ React 18'),
          React.createElement('li', null, '✅ Vite 7'),
          React.createElement('li', null, '✅ Express'),
          React.createElement('li', null, '✅ SQLite'),
          React.createElement('li', null, '✅ JWT 认证')
        )
      )
    )
  );
}

export default App;
