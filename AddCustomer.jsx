import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveCustomer } from '../store';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleColor: '',
    vehicleType: 'Sedan'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = saveCustomer(formData);
    navigate(`/schedule-wash/${newCustomer.id}`);
  };

  return (
    <div>
      <h2 className="mb-4">Register Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3>Customer Details</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} placeholder="+1 234 567 8900" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="123 Main St, City" />
          </div>
        </div>

        <div className="card">
          <h3>Vehicle Details</h3>
          <div className="form-group">
            <label>Vehicle Number</label>
            <input type="text" name="vehicleNumber" required value={formData.vehicleNumber} onChange={handleChange} placeholder="ABC 1234" />
          </div>
          <div className="form-group">
            <label>Model</label>
            <input type="text" name="vehicleModel" required value={formData.vehicleModel} onChange={handleChange} placeholder="Toyota Camry" />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input type="text" name="vehicleColor" required value={formData.vehicleColor} onChange={handleChange} placeholder="Black" />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mb-4">Register & Schedule Wash</button>
      </form>
    </div>
  );
};

export default AddCustomer;
