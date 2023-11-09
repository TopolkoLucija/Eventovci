import React from "react";
import { Toast } from "react-bootstrap";

const MyToast = (props) => {
  const { show, message, type } = props;
  //css
  const toastCss = {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: "1",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  return (
    <div style={show ? toastCss : null}>
      <Toast
        className={`border text-white ${
          type === "success"
            ? "border-success bg-success"
            : "border-danger bg-danger"
        }`}
        show={show}
      >
        <Toast.Header
          className={`text-white ${
            type === "success" ? "bg-success" : "bg-danger"
          }`}
          closeButton={false}
        >
          <strong className="mr-auto">
            {type === "success" ? ":)" : "Error"}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default MyToast;
