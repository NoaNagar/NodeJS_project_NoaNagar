import { Schema } from "mongoose";
import { IAddress } from "../../@types/user";

const addressSchema = new Schema<IAddress>({
  state: {
    required: false,
    type: String,
    minlength: 0,
    maxlength: 50,
    default: "",
  },
  country: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  city: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  street: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  houseNumber: {
    required: false,
    type: Number,
    minlength: 2,
    maxlength: 99999,
  },
  zip: {
    required: false,
    type: Number,
    minlength: 2,
    maxlength: 50,
    default: 0,
  },
});

export { addressSchema };
