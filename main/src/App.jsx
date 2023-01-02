import React, { Suspense, useLayoutEffect, useState } from "react";
import { ChakraProvider, Progress } from "@chakra-ui/react";
import { Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { createBrowserHistory } from "history";

import Navigation from "./components/Navigation";
import { Landing } from "./components/Landing";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { DashboardHome } from "./components/Dashboard/Home";
import { DashboardStatistics } from "./components/Dashboard/Statistics";
import { DashboardClients } from "./components/Dashboard/Clients";
import { UnderConstruction } from "./components/Dashboard/UnderConstruction";
const Auth = React.lazy(() => import("./components/AuthApp.js"));

import useStore from "store/store";

export const history = createBrowserHistory();

export const CustomRouter = ({ ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export const App = () => {
  const { isAuthenticated } = useStore();

  return (
    <ChakraProvider resetCSS>
      <CustomRouter>
        <Navigation />
        <Suspense fallback={<Progress size="xs" isIndeterminate />}>
          <Routes>
            <Route
              element={
                <ProtectedRoute
                  isAllowed={!isAuthenticated}
                  redirectPath="/dashboard"
                />
              }
            >
              <Route path="/auth/*" element={<Auth />} />
              <Route path="/" element={<Landing />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  isAllowed={isAuthenticated}
                  redirectPath="auth/signin"
                />
              }
            >
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="statistics" element={<DashboardStatistics />} />
                <Route path="clients" element={<DashboardClients />} />
                <Route path="settings" element={<UnderConstruction />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </CustomRouter>
    </ChakraProvider>
  );
};
