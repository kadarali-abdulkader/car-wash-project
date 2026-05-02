import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUnreadNotificationCount, checkNotifications } from '../store';

const Header = () => {
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial check
    checkNotifications();
    setUnread(getUnreadNotificationCount());

    // Check every minute
    const interval = setInterval(() => {
      if (checkNotifications()) {
        setUnread(getUnreadNotificationCount());
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="app-header">
      <h1 className="header-title">AquaWash</h1>
      <button className="notification-btn" onClick={() => {
        setUnread(0);
        navigate('/notifications');
      }}>
        <Bell size={24} />
        {unread > 0 && <span className="notification-dot"></span>}
      </button>
    </header>
  );
};

export default Header;
