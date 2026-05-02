import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomers, saveSchedule, getSettings } from '../store';

const ScheduleWash = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [settings, setSettings] = useState(null);
  
  const [formData, setFormData] = useState({
    customerId: customerId || '',
    package: 'monthly',
    date: '',
    time: '',
    location: '',
    vehicleNumber: '',
    vehicleModel: ''
  });

  useEffect(() => {
    setCustomers(getCustomers());
    setSettings(getSettings());
  }, []);

  const handleCustomerChange = (e) => {
    const custId = e.target.value;
    const customer = customers.find(c => c.id === custId);
    setFormData({
      ...formData,
      customerId: custId,
      location: customer ? customer.location : '',
      vehicleNumber: customer ? customer.vehicleNumber : '',
      vehicleModel: customer ? customer.vehicleModel : ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSchedule(formData);
    navigate('/');
  };

  if (!settings) return null;

  return (
    <div>
      <h2 className="mb-4">Schedule Wash</h2>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="form-group">
            <label>Select Customer</label>
            <select name="customerId" required value={formData.customerId} onChange={handleCustomerChange}>
              <option value="">-- Select Customer --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} - {c.vehicleNumber}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Package</label>
            <select name="package" required value={formData.package} onChange={handleChange}>
              <option value="monthly">Monthly ({settings.packages.monthly.price})</option>
              <option value="daily">Daily ({settings.packages.daily.price})</option>
              <option value="onetime">One Time Wash ({settings.packages.onetime.price})</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" required value={formData.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input type="time" name="time" required value={formData.time} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="Wash Location" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mb-4">Confirm Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleWash;
