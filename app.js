const express       = require('express');
const app           = express();
const port          = process.env.PORT || 3333;
const mongoose      = require('mongoose');
const passport      = require('passport');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const path          = require('path');
const helmet        = require('helmet');
const cors          = require('cors');

const routes        = require('./server/routes/routes');
const dbConfig      = require('./server/config/db'); 

//mongoose.connect(dbConfig.url);

dbConfig.connect();

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(passport.initialize());
routes(app, passport);

app.listen(port);
console.log('Server started on port : ' + port);