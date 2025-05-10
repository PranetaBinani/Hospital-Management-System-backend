import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { FaBed, FaPlus, FaMinus, FaEdit, FaTrash } from "react-icons/fa";
import "./BedManagement.css";

const BedManagement = () => {
  const [beds, setBeds] = useState([]);
  const [newBed, setNewBed] = useState({
    bedNumber: "",
    bedType: "General",
    status: "Available",
    ward: "",
    patient: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBed, setEditingBed] = useState(null);

  const bedTypes = [
    "General",
    "ICU",
    "CCU",
    "Pediatric",
    "Maternity",
    "Private",
  ];
  const bedStatuses = ["Available", "Occupied", "Maintenance", "Reserved"];

  const handleAddBed = (e) => {
    e.preventDefault();
    const bed = {
      ...newBed,
      _id: Date.now().toString(), // Generate a simple ID
    };
    setBeds([...beds, bed]);
    setNewBed({
      bedNumber: "",
      bedType: "General",
      status: "Available",
      ward: "",
      patient: "",
    });
    setShowAddForm(false);
  };

  const handleUpdateBed = (e) => {
    e.preventDefault();
    setBeds(
      beds.map((bed) =>
        bed._id === editingBed._id ? editingBed : bed
      )
    );
    setEditingBed(null);
  };

  const handleDeleteBed = (bedId) => {
    setBeds(beds.filter((bed) => bed._id !== bedId));
  };

  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/bed.png" alt="bedImg" />
          <div className="content">
            <div>
              <p>Bed Management</p>
            </div>
            <p>
              Manage hospital bed inventory, track availability, and update bed
              statuses.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Beds</p>
          <h3>{beds.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Available Beds</p>
          <h3>{beds.filter((bed) => bed.status === "Available").length}</h3>
        </div>
      </div>

      <div className="bed-management">
        <div className="header">
          <h5>Bed Inventory</h5>
          <button
            className="btn add-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? <FaMinus /> : <FaPlus />}
            {showAddForm ? "Cancel" : "Add New Bed"}
          </button>
        </div>

        {showAddForm && (
          <form className="bed-form" onSubmit={handleAddBed}>
            <h6>Add New Bed</h6>
            <div className="form-group">
              <label>Bed Number</label>
              <input
                type="text"
                value={newBed.bedNumber}
                onChange={(e) =>
                  setNewBed({ ...newBed, bedNumber: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Bed Type</label>
              <select
                value={newBed.bedType}
                onChange={(e) =>
                  setNewBed({ ...newBed, bedType: e.target.value })
                }
              >
                {bedTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={newBed.status}
                onChange={(e) =>
                  setNewBed({ ...newBed, status: e.target.value })
                }
              >
                {bedStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Ward/Department</label>
              <input
                type="text"
                value={newBed.ward}
                onChange={(e) => setNewBed({ ...newBed, ward: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Patient (if occupied)</label>
              <input
                type="text"
                value={newBed.patient}
                onChange={(e) =>
                  setNewBed({ ...newBed, patient: e.target.value })
                }
                disabled={newBed.status !== "Occupied"}
              />
            </div>
            <button type="submit" className="btn submit-btn">
              Add Bed
            </button>
          </form>
        )}

        {editingBed && (
          <form className="bed-form" onSubmit={handleUpdateBed}>
            <h6>Edit Bed</h6>
            <div className="form-group">
              <label>Bed Number</label>
              <input
                type="text"
                value={editingBed.bedNumber}
                onChange={(e) =>
                  setEditingBed({ ...editingBed, bedNumber: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Bed Type</label>
              <select
                value={editingBed.bedType}
                onChange={(e) =>
                  setEditingBed({ ...editingBed, bedType: e.target.value })
                }
              >
                {bedTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={editingBed.status}
                onChange={(e) =>
                  setEditingBed({ ...editingBed, status: e.target.value })
                }
              >
                {bedStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Ward/Department</label>
              <input
                type="text"
                value={editingBed.ward}
                onChange={(e) =>
                  setEditingBed({ ...editingBed, ward: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Patient (if occupied)</label>
              <input
                type="text"
                value={editingBed.patient}
                onChange={(e) =>
                  setEditingBed({ ...editingBed, patient: e.target.value })
                }
                disabled={editingBed.status !== "Occupied"}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn submit-btn">
                Update
              </button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => setEditingBed(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <table className="bed-table">
          <thead>
            <tr>
              <th>Bed Number</th>
              <th>Type</th>
              <th>Status</th>
              <th>Ward</th>
              <th>Patient</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {beds.length > 0 ? (
              beds.map((bed) => (
                <tr
                  key={bed._id}
                  className={`status-${bed.status.toLowerCase()}`}
                >
                  <td>{bed.bedNumber}</td>
                  <td>{bed.bedType}</td>
                  <td>
                    <span className={`status-badge ${bed.status.toLowerCase()}`}>
                      {bed.status}
                    </span>
                  </td>
                  <td>{bed.ward || "-"}</td>
                  <td>{bed.patient || "-"}</td>
                  <td className="actions">
                    <button
                      className="btn edit-btn"
                      onClick={() => setEditingBed({ ...bed })}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDeleteBed(bed._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No beds found. Add a new bed to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BedManagement;