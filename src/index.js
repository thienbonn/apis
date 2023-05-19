const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
const handlebars = require("express-handlebars").engine;
const port = 3000;

app.use(morgan("combined"))

app.use(express.static(path.join(__dirname, 'public')))

// app.engine('hds', handlebars({
//     extname: ".hds"
// }));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set("views" ,path.join(__dirname, "resources/views"))

// console.log(__dirname)


app.get('/', (req, res) => {
    return res.render("home");
})
app.get('/new', (req, res) => {
    return res.render("new");
})

app.listen(port, () => console.log(`test: listening on http://localhost:${port}`));