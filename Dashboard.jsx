import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, Droplet } from 'lucide-react';
import { getSchedules, getCustomers } from '../store';
import { format, parseISO } from 'date-fns';

const Dashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setSchedules(getSchedules().filter(s => s.status === 'pending'));
    setCustomers(getCustomers());
  }, []);

  return (
    <div>
      <div className="flex-between mb-4">
        <h2>Dashboard</h2>
      </div>

      <div className="grid-2 mb-4">
        <Link to="/add-customer" className="card text-center" style={{ textDecoration: 'none' }}>
          <PlusCircle size={32} className="mb-2" style={{ color: 'var(--primary-color)' }}/>
          <h3>New Customer</h3>
        </Link>
        <Link to="/schedule-wash" className="card text-center" style={{ textDecoration: 'none' }}>
          <Calendar size={32} className="mb-2" style={{ color: 'var(--accent-color)' }}/>
          <h3>Schedule Wash</h3>
        </Link>
      </div>

      <h3>Upcoming Washes</h3>
      {schedules.length === 0 ? (
        <div className="card text-center" style={{ padding: '2rem' }}>
          <Droplet size={48} className="mb-2" style={{ opacity: 0.2 }} />
          <p>No upcoming washes scheduled.</p>
        </div>
      ) : (
        schedules.map(schedule => {
          const customer = customers.find(c => c.id === schedule.customerId);
          return (
            <div key={schedule.id} className="card">
              <div className="flex-between mb-2">
                <strong>{schedule.date} at {schedule.time}</strong>
                <span className="badge badge-accent">{schedule.package}</span>
              </div>
              <p className="mb-2" style={{ margin: 0 }}>
                {customer?.name} - {schedule.vehicleNumber} ({schedule.vehicleModel})
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Location: {schedule.location}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Dashboard;
