import React from "react";
import PropTypes from "prop-types";

function renderMessage(status) {
  console.log("error page", status);
  switch (status) {
    case 404:
      return (
        <div>
          <img src={require("./404-page-large.png")} alt="Page not found" />
        </div>
      );
    case 500:
      return (
        <div>
          <img
            src={require("./error-500-doofinder.jpg")}
            alt="Internal server error"
          />
        </div>
      );
    default:
      return (
        <div>
          <img src={require("./404-page-large.png")} alt="Page not found" />
        </div>
      );
  }
}

const ErrorPage = (props) => {
  return (
    <div>
      {/* <h1>Error Page + {props.errorStatus}</h1> */}
      <center>{renderMessage(props.errorStatus)}</center>
    </div>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
  errorStatus: PropTypes.number.isRequired,
};

export default ErrorPage;
