import { Outlet } from "react-router";
import { SidebarTeacher } from "./components/sidebar";

export function TeacherLayout() {
  return (
    <>
      <SidebarTeacher />
      <Outlet />
    </>
  );
}
