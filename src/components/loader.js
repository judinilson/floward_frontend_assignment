import React from "react";

export const Loader = ({ data }) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center ">
        {data.loading && (
          <div className="spinner-border spinner-border-sm"></div>
        )}
      </div>
      <div>
        {data.error && (
          <div className="text-danger">
            Error loading data: {data.error.message}
          </div>
        )}
      </div>
    </>
  );
};
