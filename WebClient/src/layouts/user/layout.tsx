import { Outlet } from "react-router";
import { SidebarUser } from "./components/sidebar";

export function UserLayout() {
  return (
    <>
      <SidebarUser />
      <Outlet />
    </>
  )
}