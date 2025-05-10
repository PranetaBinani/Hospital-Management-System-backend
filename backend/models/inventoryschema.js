import mongoose from "mongoose";
import validator from "validator";

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Item Name is required!"],
    minLength: [3, "Item Name must contain at least 3 characters!"],
  },
  category: {
    type: String,
    required: [true, "Category is required!"],
    enum: {
      values: [
        "Medicine",
        "Surgical",
        "Diagnostic",
        "Disposables",
        "Sanitation",
        "Office Supplies",
        "Equipment",
      ],
      message: "Category must be one of the predefined options!"
    },
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required!"],
    min: [1, "Quantity cannot be negative!"],
  },
  unit: {
    type: String,
    required: [true, "Unit is required!"],
    enum: ["pcs", "bottles", "boxes", "packs", "ml", "L", "mg", "g"],
  },
  expiryDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value ? value > new Date() : true;
      },
      message: "Expiry date must be in the future!",
    },
  },
  supplier: {
    type: String,
    minLength: [2, "Supplier name must contain at least 2 characters!"],
  },
}, {
  timestamps: true,
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
