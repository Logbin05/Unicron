import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage";
import { MyProfilePage } from "@pages/ProfilePage";
import { UserLayout } from "@layouts/user/layout";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="u/*" element={<UserLayout />}>
          <Route path="me" element={<MyProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}
