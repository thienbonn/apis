const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
// add ApolloServer server subscription and emit events
// const typeDefs = require('./graphql/Schema');
// const resolvers = require('./graphql/Resolver');
// const { ApolloServer } = require('apollo-server-express');

const morgan = require('morgan');
const { views } = require('./app/Controllers/NewsController');
const handlebars = require("express-handlebars").engine;
const port = 8080;

app.use(cookieParser())
app.use(cors());
// app.use(morgan("combined"))

app.use(express.static(path.join(__dirname, 'public')))
// su ly voi truong hop form submit back end
app.use(express.urlencoded({
    extended: true
}))

// su ly tu truong hop nhan dc tu frontend
app.use(express.json())

// app.engine('hds', handlebars({
//     extname: ".hds"
// }));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set("views", path.join(__dirname, "resources","views"))

app.use(require("./routers"))
app.get('/', (req,res) => {
  res.render("home");
})
app.use(require("./routers/index"))
// const server = new ApolloServer({ typeDefs, resolvers });
// const startApolloServer = async () => {
//   // create apollo server starting
//   await server.start();

//   // Áp dụng middleware của Apollo Server
//   server.applyMiddleware({ app, path: '/graphql' });

//   // Lắng nghe các yêu cầu từ client
// };
// app.listen(port, () => console.log(`test: listening on http://localhost:${port}${server.graphqlPath}`));
app.listen(port, () => console.log(`test: listening on http://localhost:${port}`));


// startApolloServer();

