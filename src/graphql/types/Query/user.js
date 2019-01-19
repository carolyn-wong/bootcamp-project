const User = require('../../../models/User')
const Post = require('../../../models/Post')
const Hobby = require('../../../models/Hobby')

const userResolver = async (obj, args, context) => {
  const user = await User.query().findById(args.id)
  return user
}

const usersResolver = async (obj, args, context) => {
  const { name, hometown, house, concentration, hobbies } = args
  const users = await User.query().where(qb => {
    if (name) {
      qb.where('name', 'like', `%${name}%`)
    }

    if (hometown) {
      qb.where('hometown', '=', hometown)
    }

    if (house) {
      qb.where('house', '=', house)
    }

    if (concentration) {
      qb.where('concentration', '=', concentration)
    }

    if (hobbies) {
      qb.where('hobbies', '=', hobbies)
    }
  })
  return users
}

const userPostResolver = async (obj, args, context) => {
  const userPosts = await Post.query().where({ userId: obj.id })
  return userPosts
}

const userHobbyResolver = async (obj, args, context) => {
  const userHobbies = await Hobby.query().where({ userId: obj.id })
  return userHobbies
}

const resolver = {
  Query: {
    user: userResolver,
    users: usersResolver,
  },
  User: {
    post: userPostResolver,
    hobby: userHobbyResolver,
  },
}

module.exports = resolver
