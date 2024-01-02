import { IAddress, IImage } from "./user";

type ICard = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;

  address: IAddress;
  image: IImage;

  bizNumber?: number;
  userId?: string;
  _id?: string;
  likes: string[];
  createdAt: Date;
};

export { ICard };
