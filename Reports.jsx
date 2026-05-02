import React, { useState, useEffect } from 'react';
import { getSchedules, getCustomers } from '../store';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

const Reports = () => {
  const [schedules, setSchedules] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setSchedules(getSchedules());
    setCustomers(getCustomers());
  }, []);

  const getFilteredData = () => {
    let data = [...schedules];
    const today = format(new Date(), 'yyyy-MM-dd');
    const month = format(new Date(), 'yyyy-MM');

    if (filter === 'daily') {
      data = data.filter(s => s.date === today);
    } else if (filter === 'monthly') {
      data = data.filter(s => s.date.startsWith(month));
    }
    
    return data.map(s => {
      const customer = customers.find(c => c.id === s.customerId) || {};
      return {
        ...s,
        customerName: customer.name || 'Unknown',
        customerMobile: customer.mobile || 'Unknown'
      };
    });
  };

  const handleDownloadCSV = () => {
    const data = getFilteredData();
    if (data.length === 0) {
      alert("No data to download.");
      return;
    }

    const headers = ['Date', 'Time', 'Customer Name', 'Mobile', 'Vehicle', 'Package', 'Status', 'Location'];
    const csvRows = [headers.join(',')];

    data.forEach(row => {
      const values = [
        row.date,
        row.time,
        `"${row.customerName}"`,
        `"${row.customerMobile}"`,
        `"${row.vehicleNumber}"`,
        row.package,
        row.status,
        `"${row.location}"`
      ];
      csvRows.push(values.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `carwash_report_${filter}_${format(new Date(), 'yyyyMMdd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = getFilteredData();

  return (
    <div>
      <div className="flex-between mb-4">
        <h2>Reports</h2>
        <button onClick={handleDownloadCSV} className="btn btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
          <Download size={18} /> CSV
        </button>
      </div>

      <div className="form-group">
        <label>Filter By</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="daily">Today (Daily)</option>
          <option value="monthly">This Month (Monthly)</option>
        </select>
      </div>

      <div className="card mb-4" style={{ overflowX: 'auto', padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-hover)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Date</th>
              <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
              <th style={{ padding: '0.75rem 1rem' }}>Package</th>
              <th style={{ padding: '0.75rem 1rem' }}>Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>No records found.</td>
              </tr>
            ) : (
              filteredData.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>{row.date}<br/><span style={{color:'var(--text-secondary)'}}>{row.time}</span></td>
                  <td style={{ padding: '0.75rem 1rem' }}>{row.customerName}<br/><span style={{color:'var(--text-secondary)'}}>{row.customerMobile}</span></td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className="badge badge-primary">{row.package}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>{row.vehicleNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
