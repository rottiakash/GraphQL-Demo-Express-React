const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://admin:admin123@cluster0-dblgl.mongodb.net/Express?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Server is now listining for requests on port 4000");
});
