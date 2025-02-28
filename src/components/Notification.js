import React, { useEffect } from 'react';
import '../styles/notification.css';

const Notification = ({ message, show, setShow }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  return show ? (
    <div className="notification">
      {message}
    </div>
  ) : null;
};

export default Notification;
