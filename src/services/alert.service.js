import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const alertObj = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const showSuccess = (msg) => {
    return toast.success(msg,alertObj);
  };
  
  const showError = (msg) => {
    return toast.error(msg,alertObj);
  };
  
  const showwarning = (msg) => {
    return toast.warn(msg,alertObj);
  };
  
  const showInfo = (msg) => {
    return toast.info(msg,alertObj);
  };
  
  export default {      
    showSuccess,
    showError,
    showwarning,
    showInfo,
  };