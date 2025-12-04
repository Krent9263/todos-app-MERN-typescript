import React from 'react'

const Login = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white">Login</h2>
      <form className="flex flex-col">
        <label htmlFor="email" className="text-gray-400">
          Email
        </label>
        <input type="email" id="email" className="mb-4 p-2 rounded" />

        <label htmlFor="password" className="text-gray-400">
          Password
        </label>
        <input type="password" id="password" className="mb-4 p-2 rounded" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}


export default Login
