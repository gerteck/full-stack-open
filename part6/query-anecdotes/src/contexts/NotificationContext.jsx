/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext);
  return counterAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext);
  return counterAndDispatch[1];
};

export const useDisplayNotification = () => {
  const dispatch = useNotificationDispatch();

  return (notification) => {
    dispatch({ type: "SET_NOTIFICATION", data: notification });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };
};

export default NotificationContext;
