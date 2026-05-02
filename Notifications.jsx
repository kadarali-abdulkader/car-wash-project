import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationsRead } from '../store';
import { Bell, CheckCircle } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getNotifications());
    // Mark as read when opening page
    markNotificationsRead();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Notifications</h2>
      
      {notifications.length === 0 ? (
        <div className="card text-center" style={{ padding: '2rem' }}>
          <Bell size={48} className="mb-2" style={{ opacity: 0.2 }} />
          <p>No new notifications.</p>
        </div>
      ) : (
        notifications.map(n => (
          <div key={n.id} className="card" style={{ borderLeft: !n.read ? '4px solid var(--danger-color)' : '1px solid var(--border-color)' }}>
            <div className="flex-between">
              <p style={{ margin: 0, fontWeight: !n.read ? '600' : '400', color: 'var(--text-primary)' }}>
                {n.message}
              </p>
              {n.read && <CheckCircle size={16} style={{ color: 'var(--accent-color)' }} />}
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', marginTop: '0.5rem' }}>
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
