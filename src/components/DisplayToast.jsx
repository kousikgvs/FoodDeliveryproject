import React from "react";

const DisplayToast = () => {
  const ToastNotify = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "005",
    });
  };
  return <div>
    <ToastNotify />
  </div>;
};

export default DisplayToast;
