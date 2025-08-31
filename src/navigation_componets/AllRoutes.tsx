import { Routes, Route } from "react-router-dom";
import PageNotFound from "../Pages/Error/PageNotFound";
import HomePage from "../Pages/HomePage/HomePage";
import { default as OwnerHome } from "../Owner/Home/Home";
import { default as PlayerHome } from "../Player/Home/Home";
import LoginDialog from "../Owner/Auth/LoginDialog";
import SignupDialog from "../Owner/Auth/SignupDialog";
import ForgotPassword from "../Owner/Auth/ForgotPassword";
import PlayerLogin from "../Player/Auth/PlayerLogin";
import { getSubdomain } from "../utils/getSubdomain";
import { DashBoard } from "../Owner/Dashboard/Dashboard";
import OwnerLocation from "../Owner/OwnerLocation/OwnerLocation.main.tsx"; 
import OwnerSessions from "../Owner/Sessions/OwnerSessions";
import OwnerAnalysis from "../Owner/Analsis/Analsis";
import OwnerSessionTemplates from "../Owner/SessionTemplates/OwnerSessionTemplates.tsx";
import OwnerLocationFormView from "../Owner/OwnerLocation/OwnerLocationFormView.tsx";
export const AllRoutes = () => {
  const subdomain = getSubdomain();
  
  return (
    <>
      <Routes>
        {!subdomain && <Route path="/" element={<HomePage />} />}

        {subdomain === "owner" && (
          <>
            <Route
              path="/"
              element={<OwnerHome />}
            />
            <Route path="/owner/dashboard" element={<DashBoard />} />
            <Route path="/owner/locations" element={<OwnerLocation />} />
            <Route path="/owner/locations/:ID" element={<OwnerLocationFormView />} />
            <Route path="/owner/session/templates" element={<OwnerSessionTemplates />} />
            <Route path="/owner/sessions" element={<OwnerSessions />} />
            <Route path="/owner/analysis" element={<OwnerAnalysis />} />
            </>
        )}

        {subdomain === "player" && (
          <>
            <Route
              path="/"
              element={<PlayerHome />}
            />
          </>
        )}

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
      {subdomain === "owner" && (
        <>
          <ForgotPassword />
          <LoginDialog />
          <SignupDialog />
        </>
      )}
      {subdomain === "player" && (
        <>
          <PlayerLogin />
        </>
      )}
    </>
  );
};
