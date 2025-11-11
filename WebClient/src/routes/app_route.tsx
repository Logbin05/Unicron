import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
}
