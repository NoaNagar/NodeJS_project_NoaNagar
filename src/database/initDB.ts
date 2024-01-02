import { Logger } from "../logs/logger";
import { auth } from "../service/auth-servise";
import { cardsArr } from "./cardsArr";
import { Card } from "./model/card";
import { User } from "./model/user";
import { users } from "./usersArr";

const initDB = async () => {
  const userCount = await User.countDocuments();
  const cardsCount = await Card.countDocuments();

  if (userCount != 0 && cardsCount != 0) return;

  if (userCount == 0) {
    for (let user of users) {
      user.password = await auth.hashPassword(user.password);
      const saved = await new User(user).save();
      Logger.verbose("Added users", saved);
    }
  }

  if (cardsCount == 0) {
    for (let card of cardsArr) {
      const saved = await new Card(card).save();
      Logger.verbose("Added cards", saved);
    }
  }
};

export { initDB };
