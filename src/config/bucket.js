const cloudinary = require('cloudinary').v2;

//TODO: colocar no env
cloudinary.config({
  cloud_name: 'dzqg49alw',
  api_key: '368777996687785',
  api_secret: 'ICbV-2hQ_QIIuuDZq1IHTivt28w',
});


module.exports = { cloudinary };