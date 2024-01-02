import Joi from "joi";
import { ICard } from "../@types/cards";
import { IAddress, IImage } from "../@types/user";
import { phoneRegex } from "./patterns";

const schema = Joi.object<ICard>({
  title: Joi.string().min(2).max(50).required(),
  subtitle: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(200).required(),
  phone: Joi.string().pattern(phoneRegex).min(9).max(20).required(),
  email: Joi.string().email().min(5).max(255).required(),
  web: Joi.string().min(2).max(70),
  address: Joi.object<IAddress>({
    city: Joi.string().min(2).max(50).required(),
    country: Joi.string().min(1).max(50).required(),
    houseNumber: Joi.number().min(0).max(50000).required(),
    street: Joi.string().min(1).max(50).required(),
    zip: Joi.string().min(1).max(20).required(),
    state: Joi.string().max(50).allow(""),
  }).required(),
  image: Joi.object<IImage>({
    alt: Joi.string().min(0).max(100).allow(""),
    url: Joi.string().uri().min(5).max(255).required(),
  }),
});

export { schema as joiCardSchema };
