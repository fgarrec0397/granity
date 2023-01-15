import { FC } from "react";
import { ToastContainer as ToastContainerLib, ToastContainerProps } from "react-toastify";

const ToastContainer: FC<ToastContainerProps> = (props) => {
    return <ToastContainerLib {...props} />;
};

ToastContainer.defaultProps = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
};

export default ToastContainer;
export * from "react-toastify";
