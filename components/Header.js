"use strict";
import Link from "next/link";
import { useStoreActions, useStoreState } from "easy-peasy";

const Header = () => {
  const setShowSearchModal = useStoreActions(
    (actions) => actions.modals.setShowSearchModal
  );
  return (
    <nav id="main-nav">
      <div className="container">
        <ul>
          <li>
            <Link href="/">
              <a aria-label="Home">Home</a>
            </Link>
          </li>
          <li onClick={() => setShowSearchModal()}>
            <a aria-label="search">Search Movies</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
