import mongoose, { trusted } from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: trusted
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        address: String,
        DOB: Date,
        country: String,
        phone: String,
        password: {
            type: String,
            required: true,
            trim: true
        },
        primeCustomer: {
            type: Boolean,
            default: false
        }
    },
  {
    versionKey: false,
  }
);

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
