import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  url: {
    required: false,
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  alt: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
});

export { imageSchema };
