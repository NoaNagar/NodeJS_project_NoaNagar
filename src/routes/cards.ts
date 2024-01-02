import { Router } from "express";
import { Card } from "../database/model/card";
import { creatCard } from "../service/card-service";
import { ICard } from "../@types/cards";
import { isBusiness } from "../middleware/is-business";
import { validateCard } from "../middleware/validation";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-servise";
import { isUser } from "../middleware/is-user";
import { isCard } from "../middleware/is-card";
import { extractToken } from "../middleware/is-admin";
import { User } from "../database/model/user";
import { IUser } from "../@types/user";
import { isLike } from "../middleware/is-like";

const router = Router();

// get all cards
router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.find();
    return res.json(allCards);
  } catch (e) {
    next(e);
  }
});

// create card
router.post("/", isBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      throw new BizCardsError("User must have an id", 500);
    }
    const savedCard = await creatCard(req.body as ICard, userId);

    res.json({ card: savedCard });
  } catch (e) {
    next(e);
  }
});

// get my cards
router.get("/mycards", isBusiness, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const myCards = await Card.find({ userId });

    return res.json(myCards);
  } catch (e) {
    next(e);
  }
});

// get card by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);

    return res.json(card);
  } catch (e) {
    next(e);
  }
});

// edit card
router.put("/:id", isCard, validateCard, async (req, res, next) => {
  try {
    const savedUser = await Card.updateOne({ _id: req.params.id }, req.body);
    res.json(savedUser);
  } catch (e) {
    next(e);
  }
});

// like a card
router.patch("/:id", isLike, async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    const userId = user._id;

    const saved = await Card.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: userId } },
      {
        new: true,
      }
    );
    if (!saved) {
      throw new BizCardsError("Card not found", 404);
    }
    res.json({ saved });
  } catch (e) {
    next(e);
  }
});

// delete card
router.delete("/:id", isCard, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Card.findByIdAndDelete({ _id: id });

    return res.json({ deleted });
  } catch (e) {
    next(e);
  }
});

export { router as cardsRouter };
