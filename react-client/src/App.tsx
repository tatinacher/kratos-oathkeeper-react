import { reflect } from "@effector/reflect";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { $session, initiate, $isReady } from "./features/session";
import { LoginPage, MainPage, RegistrationPage, UserPage } from "./pages";
import { AUTHORIZED_MENU, UNAUTHORIZED_MENU } from "./lib/constants";
import { Menu } from "./ui/molecules/menu";

export const AppBase: React.FC<{ session: any; isReady: boolean }> = ({
  session,
  isReady,
}) => {
  if (!isReady) {
    return null;
  }

  let menu = <Menu menu={UNAUTHORIZED_MENU} />;

  if (session) {
    const { first, last } = session?.identity?.traits?.name;

    if (first && last) {
      menu = <Menu menu={AUTHORIZED_MENU} />;
    }
  }

  return (
    <div className="App">
      <Router>
        <div>
          {menu}
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/sign-out" element={<UserPage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export const App = reflect({
  view: AppBase,
  bind: {
    session: $session,
    isReady: $isReady,
  },
  hooks: {
    mounted: initiate,
  },
});
