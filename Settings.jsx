import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../store';

const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleChange = (e, pkg, field) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    if (pkg) {
      setSettings({
        ...settings,
        packages: {
          ...settings.packages,
          [pkg]: {
            ...settings.packages[pkg],
            [field]: value
          }
        }
      });
    } else {
      setSettings({ ...settings, [e.target.name]: value });
    }
  };

  const handleSave = () => {
    saveSettings(settings);
    alert('Settings Saved Successfully!');
  };

  if (!settings) return null;

  return (
    <div>
      <div className="flex-between mb-4">
        <h2>Pricing & Packages</h2>
        <button onClick={handleSave} className="btn btn-primary" style={{ width: 'auto' }}>Save</button>
      </div>

      <div className="card">
        <h3>Monthly Package</h3>
        <div className="form-group mt-2">
          <label>Price per month</label>
          <input type="number" value={settings.packages.monthly.price} onChange={(e) => handleChange(e, 'monthly', 'price')} />
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label>Max Inside Washes</label>
            <input type="number" value={settings.packages.monthly.maxInside} onChange={(e) => handleChange(e, 'monthly', 'maxInside')} />
          </div>
          <div className="form-group">
            <label>Max Outside Washes</label>
            <input type="number" value={settings.packages.monthly.maxOutside} onChange={(e) => handleChange(e, 'monthly', 'maxOutside')} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Daily Package</h3>
        <div className="form-group mt-2">
          <label>Price per day</label>
          <input type="number" value={settings.packages.daily.price} onChange={(e) => handleChange(e, 'daily', 'price')} />
        </div>
      </div>

      <div className="card">
        <h3>One-Time Wash</h3>
        <div className="form-group mt-2">
          <label>Price</label>
          <input type="number" value={settings.packages.onetime.price} onChange={(e) => handleChange(e, 'onetime', 'price')} />
        </div>
      </div>

      <div className="card mb-4">
        <h3>Instant Wash</h3>
        <div className="form-group mt-2">
          <label>Instant Wash Price</label>
          <input type="number" name="instantWashPrice" value={settings.instantWashPrice} onChange={(e) => handleChange(e, null, null)} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
