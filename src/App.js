import "./App.css";
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Homer from "./components/Homer";
import ContactForm from "./components/ContactForm";
import FluidAnimation from "./components/react-fluid-animation";
import FluidAnimationStrings from "./components/FluidAnimationTextStrings";
import LePetitPrinceBoyAndFox from "./components/LePetitPrinceAndFox";
import PrinceMoon from "./components/Littleprince";

var defaultConfig = {
  textureDownsample: 1,
  densityDissipation: 0.98,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 25,
  curl: 30,
  splatRadius: 0.005,
};

export default class App extends Component {
  state = {
    config: {
      ...defaultConfig,
    },
  };

  render() {
    
    const { config } = this.state;

    return (
      <Switch>
        <div
          style={{
            height: "100vh",
          }}
        >
          <Navbar />
          <Route exact path="/">
            <FluidAnimation
              config={config}
              animationRef={this._animationRef}
            />
            <FluidAnimationStrings />
            <Homer />
          </Route>
          <Route exact path="/about">
            <Homer />
          </Route>
          <Route exact path="/projects">
            <LePetitPrinceBoyAndFox />
          </Route>
          <Route exact path="/services">
            <PrinceMoon />
          </Route>
          <Route exact path="/contact">
            <ContactForm />
          </Route>
          <Route exact path="/homer">
            <Homer />
          </Route>
        </div>
      </Switch>
    );
  }
}
