const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser);
app.use(bodyParser.json());

module.exports = app;
