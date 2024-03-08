import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterContainer from "./FooterContainer";

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <FooterContainer />
    </div>
  );
}

export default AppLayout;
