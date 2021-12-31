import React from "react";
import { Header } from "../Header/Header";
import "./Layout.scss"

export const Layout = ({children}) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout__wrapper">{children}</div>
    </div>
  );
};
