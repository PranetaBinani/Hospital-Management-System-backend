import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBox, FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa";
import "./InventoryManagement.css";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    itemName: "",
    category: "Medicine",
    quantity: 0,
    threshold: 10,
    unit: "pieces",
    supplier: "",
    ExpiryDate: new Date().toISOString().split("T")[0],
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const categories = [
    "Medicine",
    "Equipment",
    "Disposable",
    "Linen",
    "Surgical",
    "Diagnostic",
  ];

  const units = ["pieces", "boxes", "liters", "grams", "meters", "pairs"];

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/inventory/all",
          { withCredentials: true }
        );
        console.log(data);
        setInventory(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch inventory data");
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/inventory/add",
        newItem,
        { withCredentials: true }
      );
      setInventory([...inventory, data.item]);
      setNewItem({
        itemName: "",
        category: "Medicine",
        quantity: 0,
        threshold: 10,
        unit: "pieces",
        supplier: "",
        ExpiryDate: new Date().toISOString().split("T")[0],
      });
      setShowAddForm(false);
      toast.success("Item added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item");
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
       `http://localhost:4000/api/v1/inventory/update/${editingItem._id}`,
        editingItem,
        { withCredentials: true }
      );
      setInventory(
        inventory.map((item) => (item._id === data.item._id ? data.item : item))
      );
      setEditingItem(null);
      toast.success("Item updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update item");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/inventory/delete/${itemId}`, {
        withCredentials: true,
      });
      setInventory(inventory.filter((item) => item._id !== itemId));
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete item");
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/inventory.png" alt="inventoryImg" />
          <div className="content">
            <div>
              <p>Inventory Management</p>
            </div>
            <p>
              Track hospital inventory, manage stock levels, and receive low
              stock alerts.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Items</p>
          <h3>{inventory?.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Low Stock Items</p>
          <h3>
            {inventory?.filter((item) => item?.quantity <= item.threshold)?.length}
          </h3>
        </div>
      </div>

      <div className="inventory-management">
        <div className="header">
          <h5>Hospital Inventory</h5>
          <button
            className="btn add-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? <FaMinus /> : <FaPlus />}
            {showAddForm ? "Cancel" : "Add New Item"}
          </button>
        </div>

        {showAddForm && (
          <form className="inventory-form" onSubmit={handleAddItem}>
            <h6>Add New Inventory Item</h6>
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                value={newItem.itemName}
                onChange={(e) =>
                  setNewItem({ ...newItem, itemName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select
                  value={newItem.unit}
                  onChange={(e) =>
                    setNewItem({ ...newItem, unit: e.target.value })
                  }
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Low Stock Threshold</label>
              <input
                type="number"
                min="1"
                value={newItem.threshold}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    threshold: parseInt(e.target.value) || 0,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Supplier</label>
              <input
                type="text"
                value={newItem.supplier}
                onChange={(e) =>
                  setNewItem({ ...newItem, supplier: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                value={newItem.ExpiryDate}
                onChange={(e) =>
                  setNewItem({ ...newItem, ExpiryDate: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn submit-btn">
              Add Item
            </button>
          </form>
        )}

        {editingItem && (
          <form className="inventory-form" onSubmit={handleUpdateItem}>
            <h6>Edit Inventory Item</h6>
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, itemName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={editingItem.category}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={editingItem.quantity}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select
                  value={editingItem.unit}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, unit: e.target.value })
                  }
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Low Stock Threshold</label>
              <input
                type="number"
                min="1"
                value={editingItem.threshold}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    threshold: parseInt(e.target.value) || 0,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Supplier</label>
              <input
                type="text"
                value={editingItem.supplier}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, supplier: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                value={editingItem.ExpiryDate}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    ExpiryDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn submit-btn">
                Update
              </button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p>Loading inventory data...</p>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Threshold</th>
                <th>Status</th>
                <th>Supplier</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory?.length > 0 ? (
                inventory.map((item) => (
                  <tr
                    key={item._id}
                    className={
                      item.quantity <= item.threshold ? "low-stock" : ""
                    }
                  >
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>
                      {item.quantity} {item.unit}
                    </td>
                    <td>{item.threshold}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          item.quantity <= item.threshold
                            ? "low"
                            : item.quantity <= item.threshold * 2
                            ? "medium"
                            : "high"
                        }`}
                      >
                        {item.quantity <= item.threshold
                          ? "Low Stock"
                          : item.quantity <= item.threshold * 2
                          ? "Medium Stock"
                          : "In Stock"}
                      </span>
                    </td>
                    <td>{item.supplier || "-"}</td>
                    <td>{new Date(item.ExpiryDate).toLocaleDateString()}</td>
                    <td className="actions">
                      <button
                        className="btn edit-btn"
                        onClick={() => setEditingItem(item)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="btn delete-btn"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    No inventory items found. Add a new item to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default InventoryManagement;