interface props {
  message: string;
  status: string;
}

const Notification = ({ message, status }: props) => {
  if (message === null) {
    return null;
  }
  return <div className={status}>{message}</div>;
};

export default Notification;
