import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) {
    return;
  }
  const errorNotificationClass =
    notification.type === "error" ? "errorNotification" : "";

  return (
    <div className="overlay">
      <div className={`toast ${errorNotificationClass}`}>
        {notification.message}
      </div>
    </div>
  );
};

export default Notification;
