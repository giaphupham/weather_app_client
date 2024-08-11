import React from "react";
import Navbar from "../components/NavBar";
import MainSection from "../components/MainSection";

function HomePage() {

    return (
        <div>
            <Navbar />
            <MainSection />
        </div>
    );
}

export default {
    routeProps: {
      path: "/",
      main: HomePage,
    },
  };