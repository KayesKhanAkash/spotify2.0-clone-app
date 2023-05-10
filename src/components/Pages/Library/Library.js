import React from "react";
import { Outlet } from "react-router-dom";
import { styles } from "../../../Utils/commonStyles";

const Library = () => {
  return (
    <div className={`library mt-20 ${styles.paddingX}`}>
      <Outlet />
    </div>
  );
};

export default Library;
