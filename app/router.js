'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.admin.index);

  router.get('/api/home', controller.home.index);

};