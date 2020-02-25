class Response {
  static success(data) {
    return {
      success: true,
      code: 200,
      data: data
    }
  }

  static error(message) {
    return {
      success: false,
      code: 500,
      message: message
    }
  }
}

module.exports = Response;