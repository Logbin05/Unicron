import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage";
import { MyProfilePage } from "@pages/users/ProfilePage";
import { UserLayout } from "@layouts/user/layout";
import { ServicePage } from "@pages/users/ServicePage";
import { SupportPage } from "@pages/users/SupportPage";
import { HomePage } from "@pages/users/HomePage";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="u/*" element={<UserLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="me" element={<MyProfilePage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>
      </Routes>
    </>
  );
}
