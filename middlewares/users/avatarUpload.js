const uploader = require('../../utils/singleUploader');

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    'avatars',
    ['image/jpg', 'image/jpeg', 'image/png'],
    1000000,
    'Only .jpg, .jpeg, .png formats are allowed'
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;
