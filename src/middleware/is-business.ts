import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-servise";
import { User } from "../database/model/user";
import { BizCardsError } from "../error/biz-cards-error";

const isBusiness: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    const user = await User.findOne({ email });

    if (!user) {
      throw new BizCardsError("User does not exist", 401);
    }
    req.user = user;

    const isBusiness = user?.isBusiness;
    if (isBusiness) {
      return next();
    }

    throw new BizCardsError("user must be a Business", 401);
  } catch (e) {
    next(e);
  }
};

export { isBusiness };
