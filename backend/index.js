const express = require('express');
const app = express();

const db = require('./db/database');

const userRoutes = require('./routes/user-route');

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/user',userRoutes)

db.sync(
    // {force:true}
    ).then((result) => {
    app.listen(3000)
}).catch(err => console.log(err))