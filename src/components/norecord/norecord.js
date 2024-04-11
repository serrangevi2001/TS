import React from "react";

const NoRecord = () => (
  <div className="abs-center wd-wide">
    <div className="text-center my-5">
      <div className="mb-3">
        <em className="bi bi-database error-title"></em>
      </div>
      <div className="text-md mb-3 text-danger">No Records</div>
      <p className="lead m-0">Oh! It is empty :(</p>
      <p>
        You don`t have any records for the filter you have applied.
      </p>
    </div>
  </div>
);

export default NoRecord;
