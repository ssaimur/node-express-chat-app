// get inbox page
const getInbox = (req, res, next) => {
  res.render('inbox');
};

module.exports = { getInbox };