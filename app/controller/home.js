const Controller = require('egg').Controller;
const request = require("superagent");
const cheerio = require('cheerio');
const Promise = require("bluebird");
const vm = require('vm');
const { User } = require("../common/database");
const Response = require("../common/response");



class HomeController extends Controller {


  async index() {
    this.ctx.body = Response.success({
      message: "hello"
    });
  }


}

module.exports = HomeController;
