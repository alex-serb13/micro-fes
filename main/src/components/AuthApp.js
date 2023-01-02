import React, { useRef, useEffect } from "react";
import { mount } from "auth/AuthApp";
import { history } from "../App";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(({ location }) => onParentNavigate(location));
  }, []);

  return <div ref={ref} />;
};
