import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function AppLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
