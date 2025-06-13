const setupResponses = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = { method, url };
    const message = {
      200: "Succes",
      201: "Created",
      400: "Client error",
      401: "Bad auth",
      403: "Forbidden",
      404: "Not found",
      500: "Server error",
    };
    const succesRes = (code, response, message = message[code]) =>
      res.status(code).json({ ...data, response, message });
    res.json200 = (response, message) => succesRes(200, response, message);
    res.json201 = (response, message) => succesRes(201, response, message);
    const errorRes = (code, message = message[code]) => {
      const error = new Error(message);
      error.statusCode = code;
      throw error;
    };
    res.json400 = (message) => errorRes(400, message);
    res.json401 = (message) => errorRes(401, message);
    res.json403 = (message) => errorRes(403, message);
    res.json404 = (message) => errorRes(404, message);
    res.json500 = (message) => errorRes(500, message);
    next();
  } catch (error) {
    next(error);
  }
};

export default setupResponses;
