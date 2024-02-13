import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import resolvers from "./resolvers.js";
import typeDefs from "./schemaGql.js";
import {MONGO_URI} from "./config.js"
import mongoose from "mongoose";
import { connectionfail, mongoconnectionsuccess, serverrunning } from "./constants.js";

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(serverrunning);
  console.log(`${url}`);
});
