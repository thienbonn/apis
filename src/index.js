const express = require('express');
const app = express();

const morgan = require('morgan');
const handlebars = require("express-handlebars");
const port = 2222;

app.use(morgan("combined"))

// app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    return res.send("Hello 3456!");
})

app.listen(port, () => console.log(`test: listening on http://localhost:${port}`));