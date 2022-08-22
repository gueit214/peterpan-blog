import React, { Fragment } from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main className="Layout">{props.children}</main>
    </Fragment>
  );
};

export default React.memo(Layout);
