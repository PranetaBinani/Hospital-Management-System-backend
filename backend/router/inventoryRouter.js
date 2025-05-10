import express from "express";
import {
  addItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controller/inventoryController.js";
import {
    isAdminAuthenticated,
  } from "../middlewares/auth.js";
const router = express.Router();
router.get("/all",getItems);
router.post("/add", isAdminAuthenticated, addItem);
router.put("/update/:id",  isAdminAuthenticated,updateItem);
router.delete("/delete/:id",isAdminAuthenticated, deleteItem);

export default router;
