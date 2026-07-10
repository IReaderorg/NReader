import { useState, useEffect } from 'react'
import { MessageSquare, Trash2 } from 'lucide-react'
import { apiFetch } from '../api/client'

interface Post {
  id: string; user_id: string; content: string; type: string
  parent_id: string | null; likes: number; created_at: string
  username: string; display_name: string; avatar_url: string
}

export function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const token = localStorage.getItem('auth_token')

  useEffect(() => { apiFetch<Post[]>('/community/feed').then(setPosts).catch(() => {}) }, [])

  async function handlePost() {
    if (!content.trim() || !token) return
    await apiFetch('/community/post', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    setContent('')
    const updated = await apiFetch<Post[]>('/community/feed')
    setPosts(updated)
  }

  async function handleDelete(id: string) {
    if (!token) return
    await apiFetch(`/community/post/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    setPosts(posts.filter(p => p.id !== id))
  }

  return (
    <div className="p-4">
      <h1 className="text-base font-bold text-text mb-4">Community</h1>
      {token && (
        <div className="flex gap-2 mb-4">
          <input value={content} onChange={e => setContent(e.target.value)}
            placeholder="Share something..."
            className="flex-1 p-2 rounded-lg bg-surface border border-border-light text-text text-sm"
          />
          <button onClick={handlePost}
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm">Post</button>
        </div>
      )}
      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="p-3 rounded-xl bg-surface border border-border-light">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-accent" />
              </div>
              <span className="text-xs font-medium text-text">{post.display_name || post.username}</span>
              <span className="text-xs text-text-muted">{new Date(post.created_at).toLocaleDateString()}</span>
              {post.user_id === token && (
                <button onClick={() => handleDelete(post.id)} className="ml-auto">
                  <Trash2 className="w-3 h-3 text-text-muted" />
                </button>
              )}
            </div>
            <p className="text-sm text-text">{post.content}</p>
          </div>
        ))}
        {posts.length === 0 && <p className="text-sm text-text-muted text-center py-8">No posts yet</p>}
      </div>
    </div>
  )
}
