import React from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeAlert } from "../../actions/alert";

const Notification = ({ alerts, removeAlert }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div
      key={alert.id}
      style={{
        position: "fixed",
        right: "0",
        bottom: "0",
        zIndex: "99",
        minHeight: "200px",
      }}
      className="m-4"
    >
      <Toast
        onClose={(e) => removeAlert(alert.id)}
        className="shadow-sm"
        style={{ border: "none", boarderRadius: "10px" }}
        delay="5000"
        autohide
      >
        <Toast.Header>
          <i
            className={`text-dark fas fa-${
              alert.alertType === "danger" || alert.alertType === "warning"
                ? "exclamation-triangle"
                : alert.alertType === "success"
                ? "check-square"
                : "bell"
            }`}
          ></i>{" "}
          <strong className="text-dark mr-auto ml-1">Notification</strong>
        </Toast.Header>
        <Toast.Body className={`alert-${alert.alertType}`}>
          <strong className="mr-auto">{alert.msg}</strong>
        </Toast.Body>
      </Toast>
    </div>
  ));

Notification.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Notification);
