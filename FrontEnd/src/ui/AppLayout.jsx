import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterContainer from "./FooterContainer";
import ChatWidget from "../ui/ChatWidget";

function AppLayout() {
  return (
    <div>
      <Header />
      <ChatWidget />
      <Outlet />
      <div className="mt-auto">
        <FooterContainer />
      </div>
    </div>
  );
}

export default AppLayout;
