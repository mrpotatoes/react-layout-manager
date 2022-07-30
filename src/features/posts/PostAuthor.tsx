import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state: any) => {    
    return {
      name: '{{TEMP_NAME}}'
    }

    // Users doesn't exist on here right now for some reason
    return state.users.find((user) => user.id === userId)
  })

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
