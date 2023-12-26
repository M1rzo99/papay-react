import { Box, Button, Container, Stack, Typography } from "@mui/material";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import React, { useState } from "react";
import { RippleBadge } from "./MaterialTheme/styled";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { RestaurantPage } from "./screens/RestaurantPage";
import { CommunityPage } from "./screens/CommunityPage";
import { HelpPage } from "./screens/HelpPage";
import { HomePage } from "./screens/HomePage";
import { LoginPage } from "./screens/LoginPage";
import { MemberPage } from "./screens/MemberPage";
import { OrdersPage } from "./screens/OrdersPage";
import { NavbarHome } from "./components/header";
import { NavbarRestaurant } from "./components/header/restaurant";
import { NavbarOthers } from "./components/header/others";
import { Footer } from "./components/footer";
import Car from "./screens/testCar";
import AuthenticationModal from "./components/auth";

function App() {
  /*INITIALIZATION */
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLeginOpen] = useState(true);

  /*Handlers */
  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };
  const handleLoginOpen = () => {
    setLeginOpen(true);
  };
  const handleLoginClose = () => {
    setLeginOpen(false);
  };

  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
        />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
        />
      )}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage />
        </Route>

        <Route path="/community">
          <CommunityPage />
        </Route>

        <Route path="/orders">
          <OrdersPage />
        </Route>

        <Route path="/member-page">
          <MemberPage />
        </Route>

        <Route path="/help">
          <HelpPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      <Footer />

      <AuthenticationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signUpOpen={signUpOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleSignUpClose={handleSignUpClose}
      />
    </Router>
  );
}
export default App;
