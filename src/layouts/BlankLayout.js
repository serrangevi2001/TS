import React from "react";
import { Outlet } from "react-router-dom";
import VwSnackBarWrapper from "../components/vwSnackBar/vwSnackBarWrapper";

const BlankLayout = () => (
  <>
    <Outlet />
    <VwSnackBarWrapper />
  </>
);

export default BlankLayout;
