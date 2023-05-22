const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
const handlebars = require("express-handlebars").engine;
const port = 3000;

app.use(morgan("combined"))

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
app.set("views" ,path.join(__dirname, "resources/views"))

// app.use(require("./routers"))

app.use(require("./routers/index"))

app.listen(port, () => console.log(`test: listening on http://localhost:${port}`));