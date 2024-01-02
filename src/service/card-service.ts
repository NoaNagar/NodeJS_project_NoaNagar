import { ICard } from "../@types/cards";
import { Card } from "../database/model/card";

const creatCard = async (data: ICard, userId: string) => {
  const card = new Card(data);

  card.userId = userId;

  while (true) {
    const random = Math.floor(Math.random() * 1_000_000);
    const dbRes = await Card.findOne({ bizNumber: random });
    if (!dbRes) {
      card.bizNumber = random;
      break;
    }
  }

  return card.save();
};

export { creatCard };
