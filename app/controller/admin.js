'use strict';
const egg = require('egg');
module.exports = class AdminController extends egg.Controller {
  async index(ctx) {
    await ctx.renderClient('admin.js');
  }
};