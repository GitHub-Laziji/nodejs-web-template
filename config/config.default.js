'use strict';
const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};
  
  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/index.html')
  };
  
  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  return exports;
};