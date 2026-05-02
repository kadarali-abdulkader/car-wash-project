import { format } from 'date-fns';

const KEYS = {
  CUSTOMERS: 'carwash_customers',
  SCHEDULES: 'carwash_schedules',
  SETTINGS: 'carwash_settings',
  NOTIFICATIONS: 'carwash_notifications'
};

const DEFAULT_SETTINGS = {
  packages: {
    monthly: { name: 'Monthly', price: 500, maxInside: 4, maxOutside: 15 },
    daily: { name: 'Daily', price: 30, maxInside: 1, maxOutside: 1 },
    onetime: { name: 'One Time Wash', price: 50, maxInside: 1, maxOutside: 1 }
  },
  instantWashPrice: 60
};

// --- Settings ---
export const getSettings = () => {
  const data = localStorage.getItem(KEYS.SETTINGS);
  return data ? JSON.parse(data) : DEFAULT_SETTINGS;
};

export const saveSettings = (settings) => {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
};

// --- Customers ---
export const getCustomers = () => {
  const data = localStorage.getItem(KEYS.CUSTOMERS);
  return data ? JSON.parse(data) : [];
};

export const saveCustomer = (customer) => {
  const customers = getCustomers();
  const newCustomer = {
    ...customer,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  customers.push(newCustomer);
  localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(customers));
  return newCustomer;
};

export const getCustomerById = (id) => {
  return getCustomers().find(c => c.id === id);
};

// --- Schedules ---
export const getSchedules = () => {
  const data = localStorage.getItem(KEYS.SCHEDULES);
  return data ? JSON.parse(data) : [];
};

export const saveSchedule = (schedule) => {
  const schedules = getSchedules();
  const newSchedule = {
    ...schedule,
    id: Date.now().toString(),
    status: 'pending', // pending, completed, cancelled
    createdAt: new Date().toISOString()
  };
  schedules.push(newSchedule);
  localStorage.setItem(KEYS.SCHEDULES, JSON.stringify(schedules));
  return newSchedule;
};

export const updateScheduleStatus = (id, status) => {
  const schedules = getSchedules();
  const index = schedules.findIndex(s => s.id === id);
  if (index !== -1) {
    schedules[index].status = status;
    localStorage.setItem(KEYS.SCHEDULES, JSON.stringify(schedules));
  }
};

// --- Notifications ---
// A simple logic: we check for pending schedules that are exactly within the next 30 mins
export const checkNotifications = () => {
  const schedules = getSchedules().filter(s => s.status === 'pending');
  const now = new Date();
  const thirtyMinsFromNow = new Date(now.getTime() + 30 * 60000);
  
  const existingNotifications = getNotifications();
  let newNotifsAdded = false;

  schedules.forEach(schedule => {
    const washTime = new Date(`${schedule.date}T${schedule.time}`);
    // If washTime is between now and 30 mins from now
    if (washTime > now && washTime <= thirtyMinsFromNow) {
      // Check if we already notified for this schedule
      if (!existingNotifications.find(n => n.scheduleId === schedule.id)) {
        existingNotifications.unshift({
          id: Date.now().toString(),
          scheduleId: schedule.id,
          message: `Upcoming Wash for ${schedule.vehicleNumber} at ${schedule.time} (${schedule.location})`,
          read: false,
          createdAt: new Date().toISOString()
        });
        newNotifsAdded = true;
      }
    }
  });

  if (newNotifsAdded) {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(existingNotifications));
    return true; // indicates new notifications
  }
  return false;
};

export const getNotifications = () => {
  const data = localStorage.getItem(KEYS.NOTIFICATIONS);
  return data ? JSON.parse(data) : [];
};

export const markNotificationsRead = () => {
  const notifs = getNotifications().map(n => ({ ...n, read: true }));
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
};

export const getUnreadNotificationCount = () => {
  return getNotifications().filter(n => !n.read).length;
};
