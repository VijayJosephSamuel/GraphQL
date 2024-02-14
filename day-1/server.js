import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import typeDefs from "./schemaGql.js";
import {JWT_SECRET, MONGO_URI} from "./config.js"
import mongoose from "mongoose";
import { connectionfail, mongoconnectionsuccess, serverrunning } from "./constants.js";
import  JWT  from "jsonwebtoken";
mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected", ()=>{
    console.log(mongoconnectionsuccess)
})

mongoose.connection.on("error", ()=>{
    console.log(connectionfail)
})

import './models/User.js'
import './models/Quotes.js'
import resolvers from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({req})=>{
    console.log('req', req.headers.token)
    const authorization = req.headers.token
    if(authorization){
      const {userId} = JWT.verify(authorization, JWT_SECRET)
      return {userId}
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(serverrunning);
  console.log(`\n  ${url}`);
});
