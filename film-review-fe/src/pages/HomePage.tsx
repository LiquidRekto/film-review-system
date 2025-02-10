import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/films");
  }, []);

  return <div></div>;
};

export default HomePage;
