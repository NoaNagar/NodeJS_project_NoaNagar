import { ErrorRequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { Logger } from "../logs/logger";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // userService Error
  Logger.error(err);
  if (err instanceof BizCardsError) {
    return res.status(err.status).json({ message: err.message });
  }

  //   Mongoose Error
  if (err.code && err.code == 11000 && err.keyPattern && err.keyValue) {
    return res.status(400).json({
      message: "Duplicate Key",
      prpperty: err.keyValue,
      index: err.keyPattern,
    });
  }

  //   Json Error
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid Json" });
  }

  //   cathall
  return res.status(500).json({ message: "Internal Server Error" });
};

export { errorHandler };
