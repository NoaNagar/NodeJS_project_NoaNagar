import { RequestHandler } from "express";
import { Card } from "../database/model/card";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-servise";
import { User } from "../database/model/user";
import { IUser } from "../@types/user";
import { Logger } from "../logs/logger";
import { BizCardsError } from "../error/biz-cards-error";
import { isValidObjectId } from "mongoose";

const isLike: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    const userId = user._id;

    const cardId = req.params.id;

    const valid = isValidObjectId(cardId);
    if (!valid) {
      throw new BizCardsError("The Id is not type of ObjectId", 401);
    }

    const cardExist = await Card.findById(cardId);
    if (!cardExist) throw new BizCardsError("Card does not exist", 401);
    const { likes } = await Card.findById(cardId);

    if (likes.includes(userId)) {
      const card = await Card.findOneAndUpdate(
        { _id: cardId },
        { $pull: { likes: userId } },
        { new: true }
      );
      res.json({ card });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

export { isLike };
