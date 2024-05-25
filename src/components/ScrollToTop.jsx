import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IsAuthenticated } from "../utils/IsAuthenticated";

const ScrollToTop = (props) => {
  const location = useLocation();
  IsAuthenticated();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
