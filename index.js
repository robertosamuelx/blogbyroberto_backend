require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once('open', () => {
    console.log('we are connected');
});

app.use(cors({
    allowedHeaders: '*',
    methods: '*',
    exposedHeaders: '*',
    origin: '*'
}));

app.options('/delete',cors());

app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
app.listen(process.env.PORT || 3333);