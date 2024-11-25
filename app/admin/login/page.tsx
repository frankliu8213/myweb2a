'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里应该添加真实的认证逻辑
    if (username === 'admin' && password === 'password') {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0C0E] flex items-center justify-center">
      <div className="bg-[#1A1D21] p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0A0C0E] text-white px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0C0E] text-white px-4 py-2 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#00F5D4] text-[#0A0C0E] py-3 rounded-lg hover:bg-[#00F5D4]/90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
} 