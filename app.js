const express       = require('express');
const app           = express();
const port          = process.env.PORT || 3333;
const mongoose      = require('mongoose');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const path          = require('path');
const helmet        = require('helmet');
const cors          = require('cors');
//const passport      = require('passport');

const routes        = require('./server/routes/routes');
const dbConfig      = require('./server/config/db'); 

//mongoose.connect(dbConfig.url);

dbConfig.connect();

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//app.use(passport.initialize());
routes(app);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(port);
console.log('Server started on port : ' + port);


// catch 404 and forward to error handler
app.use(( req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handler
app.use((err, req, res, next) => {
    console.error('\x1b[31m', err);

    res.status(err.status || 500);
    if (err.status == 404) res.send(err.message);
    else res.json({ error: 'oops! Something broke. Unable to process.'});
});