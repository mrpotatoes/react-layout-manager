import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Author } from '../../Author'
import { TimeAgo } from '../../misc/TimeAgo'
import { ReactionButtons } from '../../ReactionButtons'

export const Post = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state: any) =>
    state.posts.find((post) => post.id === postId)
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <Author userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
