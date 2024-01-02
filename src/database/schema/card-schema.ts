import mongoose, { Schema } from "mongoose";
import { ICard } from "../../@types/cards";
import { imageSchema } from "./img-schema";
import { addressSchema } from "./address-schema";
import { ref, required } from "joi";

const cardSchema = new Schema<ICard>({
  title: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  subtitle: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 20,
  },
  email: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  web: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 70,
  },
  userId: {
    type: String,
    ref: "User",
    required: false,
  },
  bizNumber: {
    type: Number,
    required: false,
    default: () => Math.round(Math.random() * 1_000_000),
    unique: true,
  },
  likes: [
    {
      type: String,
    },
  ],
  image: imageSchema,
  address: addressSchema,
});

export { cardSchema };
