import React, { useState, useLayoutEffect, useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme, useColorMode } from "@chakra-ui/react";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import useStore from "store/store";

export const CustomRouter = ({ history, ...props }) => {
  const { mode } = useStore();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(mode);
  }, [mode]);

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

const config = {
  initialColorMode: localStorage.getItem("chakra-ui-color-mode"),
  useSystemColorMode: false,
};

const App = ({ history }) => {
  return (
    <ChakraProvider theme={extendTheme({ config })} resetCSS>
      <CustomRouter history={history}>
        <Routes>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </CustomRouter>
    </ChakraProvider>
  );
};

export default App;
