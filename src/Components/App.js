import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header/Header";
import Detail from "./Detail/Detail";
import About from "./About/About";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import Gallery from "./Gallery/Gallery";

function App() {
  return (
    <Router>
      <div className="bg-black text-white">
        <Container>
          <Header />

          <div className="p-2 md:p-10">
            <Switch>
              <Route path="/token/:tokenId">
                <Detail />
              </Route>
              <Route path="/">
                <h1 className="heading text-5xl md:text-7xl mb-10 md:mb-20">
                  Welcome to Bandwagon's NFT Drop
                </h1>
                <About />
                <Gallery />
                <WhoWeAre />
              </Route>
            </Switch>
          </div>
        </Container>
      </div>
    </Router>
  );
}

export default App;
