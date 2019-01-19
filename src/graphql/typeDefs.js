const gql = require('graphql-tag')

module.exports = gql`
  enum HOBBY {
    SPORTS
    ARTS
    MUSIC
    READING
    TRAVEL
    DINING
    CODING
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    birthday: String!
    concentration: String!
    hometown: String!
    house: String!
    gender: String!
    bio: String!
    picture: String!
    post: [Post]
    hobby: [Hobby]
    friend: [Friend]
  }

  type Post {
    id: ID!
    content: String!
    userId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Hobby {
    id: ID!
    userId: ID!
    hobby: HOBBY!
    createdAt: String!
    updatedAt: String!
  }

  type Friend {
    id: ID!
    senderId: ID!
    recipientId: ID!
  }

  input HobbyInput {
    hobby: HOBBY
  }

  type Query {
    users(
      name: String
      hometown: String
      house: String
      concentration: String
      hobbies: [HobbyInput]
    ): [User!]!
    user(id: ID!): User!
    post(id: ID!): Post!
    posts: [Post!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserReturn!
    updateUser(input: UpdateUserInput!): UpdateUserReturn!
    loginUser(input: LoginUserInput!): LoginUserReturn!
    createPost(input: CreatePostInput!): CreatePostReturn!
    updatePost(id: ID!, input: UpdatePostInput!): UpdatePostReturn!
    acceptFriendRequest(
      requesterId: ID!
      input: FriendRequestInput
    ): FriendRequestReturn!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    createdAt: String!
  }

  type CreateUserReturn {
    error: String
    user: User
    id: ID
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    birthday: String
    concentration: String
    hometown: String
    house: String
    gender: String
    bio: String
    picture: String
    # post: Post
    # hobby: Hobby
    # friend: Friend
    updatedAt: String!
  }

  type UpdateUserReturn {
    error: String
    user: User
    id: ID
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type LoginUserReturn {
    error: String
    user: User
    id: ID
  }

  input CreatePostInput {
    content: String!
    userId: ID!
    createdAt: String!
  }

  type CreatePostReturn {
    error: String
    post: Post
    id: ID
  }

  input UpdatePostInput {
    content: String
    updatedAt: String!
  }

  type UpdatePostReturn {
    error: String
    post: Post
    id: ID
  }

  input FriendRequestInput {
    recipientId: ID!
    createdAt: String!
  }

  type FriendRequestReturn {
    error: String
    friend: Friend
    id: ID
  }
`
