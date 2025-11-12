import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage";
import { MyProfilePage } from "@pages/ProfilePage";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="my" element={<MyProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}
