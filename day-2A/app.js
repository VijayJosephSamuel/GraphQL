var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(
  `
    type Query {
        data:Developer
    }

    type Developer{
        name:String
        email:[String]
        exp:Int
    }
    `
);
var resolver = {
  name: () => {
    return "Administrator";
  },
  email: () => {
    return "admin@gmail.com"
  },
  data:()=>{
    return {
        name:"vijay",
        email:["hi@hi.com", "hello@hello.com"],
        exp:5
    }
  }
};

var app = express();
app.use(
  "/qualgql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.listen(4200);
console.log("server is ready");
