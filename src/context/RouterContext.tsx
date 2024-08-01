import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type RouteLog = {
  current: string;
  from: string;
};

export const RouterLogContext = createContext<RouteLog>({
  current: "",
  from: "",
});

const RouterLogProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [route, setRoute] = useState<RouteLog>({
    //--> It can be replaced with useRef or localStorage
    current: location.pathname,
    from: location.pathname,
  });

  useEffect(() => {
    setRoute((prev) => ({ current: location.pathname, from: prev.current }));
  }, [location]);

  useEffect(() => {
    console.log("route:", route);
    return () => {};
  }, [route]);

  return (
    <RouterLogContext.Provider value={route}>
      {children}
    </RouterLogContext.Provider>
  );
};

export default RouterLogProvider;
