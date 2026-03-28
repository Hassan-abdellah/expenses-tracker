import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { Fragment } from "react";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
