import React from "react";
import {
  Backdrop,
  BackdropProps,
  CircularProgress,
  CircularProgressProps,
} from "@mui/material";
import "./index.css";

type TSpinner = {
  circularProgressProps?: CircularProgressProps;
  backdropProps?: BackdropProps;
};

export const SplashScreen: React.FC<TSpinner> = ({
  circularProgressProps,
  backdropProps,
}) => (
  <Backdrop className="spinner" open={true} {...backdropProps}>
    <CircularProgress color="inherit" {...circularProgressProps} />
  </Backdrop>
);
