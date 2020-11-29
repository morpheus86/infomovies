"use strict";
import Link from "next/link";

const Header = () => {
  return (
    <nav id="main-nav">
      <div className="container">
        <ul>
          <li>
            <Link href="/">
              <a aria-label="Home">Home</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
