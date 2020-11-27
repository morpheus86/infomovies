"use strict";
import Header from "./Header";
import Modal from "./Modal";
import Search from "./Search";
import { useStoreActions, useStoreState } from "easy-peasy";
const Layout = (props) => {
  const showModal = useStoreState((state) => state.modals.showModal);
  const showSearchModal = useStoreState(
    (state) => state.modals.showSearchModal
  );
  const setShowSearchModal = useStoreActions(
    (actions) => actions.modals.setShowSearchModal
  );
  const setHideModal = useStoreActions(
    (actions) => actions.modals.setHideModal
  );

  return (
    <div>
      <Header />
      <main>{props.content}</main>
      {showModal && (
        <Modal close={() => setHideModal()}>
          {showSearchModal && <Search />}
        </Modal>
      )}
    </div>
  );
};

export default Layout;
