import { RequestHandler, Request } from "express";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-servise";
import { IUser } from "../@types/user";
import { Card } from "../database/model/card";

const isCard: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;

    if (!user) throw new BizCardsError("User does not exist", 401);

    if (card.userId == user?._id) return next();

    res.status(401).json({ message: "The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isCard };
