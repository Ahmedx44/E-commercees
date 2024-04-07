import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterContainer from "./FooterContainer";
import ChatWidget from "../ui/ChatWidget";

function AppLayout() {
  return (
    <div>
      <Header />
      <ChatWidget /> {/* Add the ChatWidget here */}
      <Outlet />
      <FooterContainer />
    </div>
  );
}

export default AppLayout;
