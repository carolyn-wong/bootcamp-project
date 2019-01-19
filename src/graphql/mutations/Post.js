const User = require('../../models/User')

const createPost = async (obj, { content }, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: {
        message: 'Logged in user does not exist',
      },
    }
  }

  const post = await user.$relatedQuery('posts').insert({ content })

  if (!post) {
    throw new Error('Could not add post')
  }

  return {
    post,
  }
}

const updatePost = async (obj, args, context) => {
  const { id, newContent } = args
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: {
        message: 'Logged in user does not exist',
      },
    }
  }

  const newPost = await user
    .$relatedQuery('posts')
    .where(('id', id))
    .patch(('content', newContent))

  if (!newPost) {
    throw new Error('Could not edit post')
  }

  return {
    newPost,
  }
}

const resolver = { Mutation: { createPost, updatePost } }

module.exports = resolver
