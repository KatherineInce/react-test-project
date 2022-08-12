//Notification component dynamic message
import { FiAlertOctagon } from "react-icons/fi";

const Notifications = ({message}) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
       <FiAlertOctagon className="me-2"/> {message}
    </div>
  )
}

export default Notifications