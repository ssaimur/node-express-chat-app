const createError = require('http-errors');

const notFoundHandler = (req, res, next) => {
  next(
    createError(404, 'The content that you are searching for does not exists')
  );
};

const errorHandler = (err, req, res, next) => {
  res.locals.errors =
    process.env.NODE_ENV === 'development'
      ? err
      : { message: err.message, status: err.status };

  res.status(err.status || 500);

  if (res.locals.html) {
    // html response
    res.render('error', {
      title: 'Error page',
    });
  } else {
    // json response
    res.json(res.locals.errors);
  }
};

module.exports = { notFoundHandler, errorHandler };
