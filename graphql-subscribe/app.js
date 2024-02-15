
const {ApolloServer,gql} =require('apollo-server')
const {PubSub} =require('graphql-subscriptions')

const typeDefs=gql `
type Query {
    user: User
}
type User {
    id: ID
    username: String
    firstLetterOfUsername: String
}
type Error {
    field: String
    message: String
}
type RegisterResponse {
    errors: [Error]
    user: User
}
input UserInfo {
    username: String
    password: String
    age: Int
}
type Mutation {
    register(userInfo: UserInfo):RegisterResponse
    login(userInfo: UserInfo): String
}

type Subscription {
    newUser: User
}
`
const NEW_USER="NEW_USER"

const resolvers={
    Subscription:{
       newUser:{
        subscribe:(_,__,{pubsub}) =>pubsub.asyncIterator(NEW_USER)
       }
    },
    User:{
        firstLetterOfUsername: parent =>{
            return parent.username ? parent.username[0] : null
        }
    },
    Query:{
        user:()=> ({
            id:1,
            username:"admin"
        })
    },
    Mutation:{
        login: async(parent,{userInfo:{username}},context) => {
            // check the password
            //await checkpassword(password)
            return username
        },
        register:(_,{userInfo:{username}},{pubsub}) =>{

            const user={
                id:1,
                username
            }
            pubsub.publish(NEW_USER,{
                newUser:user
            });
            errors : [
                {
                    field: "username",
                    message: "bad"
                },
                {
                    field: "username2",
                    message: "bad2"
                }
            ],
            user
        }
    }
}
const pubsub= new PubSub()
const server= new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req,res}) => ({req,res,pubsub})
})
server.listen().then(({url})=> console.log(`server started ${url}`))