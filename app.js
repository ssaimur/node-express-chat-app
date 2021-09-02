// external imports
const cookieParser = require('cookie-parser');
const expresss = require('express');
const mogoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require('./middlewares/common/errorHandler');
const loginRouter = require('./routers/loginRouter');
const userRouter = require('./routers/usersRouter');
const inboxRouter = require('./routers/inboxRouter');

const app = expresss();

// connect to database
mogoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log('connected to database...'))
  .catch((err) => console.log(err));

// request parsers
app.use(expresss.json());
app.use(expresss.urlencoded({ extended: true }));

// set the view engine
app.set('view engine', 'ejs');

// set static folder
app.use(expresss.static(path.join(__dirname, 'public')));

// set cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// set routing
app.use('/', loginRouter);
app.use('/users', userRouter);
app.use('/inbox', inboxRouter);

// 404 not found middlware
app.use(notFoundHandler);

// defalut error handler
app.use(errorHandler);

// app listener

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`the server is listening at port ${port}`);
});
