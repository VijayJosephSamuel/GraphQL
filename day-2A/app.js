var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(
  `
    type Query {
        name:String
    }
    `
);
var resolver = {
  name: () => {
    return "Administrator";
  },
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
