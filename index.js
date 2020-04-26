require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once('open', () => {
    console.log('we are connected');
});

app.use(express.json());
app.use(cors({
    allowedHeaders: '*',
    exposedHeaders: '*'
}));

app.use(routes);
app.listen(process.env.PORT || 3333);