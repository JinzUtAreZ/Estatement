import React from "react";
import Spinner from "../../resources/spinner.gif";

export const LoaderPage = () => {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
};

export default LoaderPage;
