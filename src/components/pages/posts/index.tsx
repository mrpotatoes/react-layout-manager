import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Author } from '../../Author'
import { TimeAgo } from '../../misc/TimeAgo'
import { ReactionButtons } from '../../ReactionButtons'

export const Posts = () => {
  const posts = useSelector((state: any) => state.posts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {orderedPosts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
          <div>
            <Author userId={post.user} />
            <TimeAgo timestamp={post.date} />
          </div>
          <p className="post-content">{post.content.substring(0, 100)}</p>

          <ReactionButtons post={post} />
          <Link to={`/posts/${post.id}`} className="button muted-button">
            View Post
          </Link>
        </article>
      ))}
    </section>
  )
}
