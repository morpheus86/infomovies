"use strict";
import Header from "./Header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <main>{props.content}</main>
    </div>
  );
};

export default Layout;
