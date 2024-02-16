const express = require('express');
const app = express();
const cors = require('cors')

const db = require('./db/database');

const userRoutes = require('./routes/user-route');
const messageRoutes = require('./routes/message-route');
const groupRoutes = require('./routes/group-route');

require('dotenv').config();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/group',groupRoutes);

db.sync(
    // {force:true}
    ).then((result) => {
    app.listen(3000)
}).catch(err => console.log(err))