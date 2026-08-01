// AlertFeed.tsx

/*
Same task as before:

Find and fix the bugs (there are 3 this time too).
New feature to add: an unread/unacknowledged count badge (e.g., "3 unread") displayed prominently, plus a "dismiss all" button that acknowledges every alert at once.
*/
import { useState, useEffect } from 'react';

type Alert = {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  acknowledged: boolean;
};

type AlertFeedProps = {
  fetchNewAlert: () => Alert | null; // returns a new alert, or null if none
};

function AlertFeed({ fetchNewAlert }: AlertFeedProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = fetchNewAlert();
      // if (newAlert) {
      //   alerts.push(newAlert);
      //   setAlerts(alerts);
      // }
      if (newAlert) {
        setAlerts(prev => [...prev, newAlert]); // new array, always current
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (id: string) => {
    // const alert = alerts.find(a => a.id === id);
    // if (alert) {
    //   alert.acknowledged = true;
    //   setAlerts(alerts);
    // }
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const unreadCount = alerts.filter(alert => !alert.acknowledged).length;
  const handleDismissAll = () => {
    setAlerts(prev =>
      prev.map(alert => { return { ...alert, acknowledged: true } })
    )
  }

  return (
    <div>
      <div>Unread: {unreadCount}</div>
      <button onClick={handleDismissAll}>Dismiss All</button>
      {alerts.map(alert => (
        <div key={alert.id} style={{ opacity: alert.acknowledged ? 0.5 : 1 }}>
          <span>{alert.message}</span>
          <span> [{alert.severity}]</span>
          {!alert.acknowledged && (
            <button onClick={() => handleAcknowledge(alert.id)}>Acknowledge</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AlertFeed;