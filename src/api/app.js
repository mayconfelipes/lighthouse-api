const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');

const router = require('../routes/routes');

const httpServer = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router)

module.exports = httpServer;
