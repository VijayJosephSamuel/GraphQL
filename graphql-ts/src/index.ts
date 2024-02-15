import { ApolloServer } from "apollo-server-express";
import express from "express";
import { Resolver, buildSchema, Query } from "type-graphql";
import "reflect-metadata"

@Resolver()
class WelcomeResolver{
    @Query(()=> String)
    async welcomeWorld(){
        return"Welcome to GraphQL"
    }
}

const main = async()=>{
    const schema = await buildSchema({
        resolvers:[WelcomeResolver]
    })
    const apolloServer = new ApolloServer({
        schema
    })
    const app = express()
    apolloServer.applyMiddleware({app})
    app.listen(4000, ()=>{
        console.log("server is ready..");
        
    })
}

main()