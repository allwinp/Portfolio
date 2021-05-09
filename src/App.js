import './App.css';
import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Homer from './components/Homer';
import Header from './components/Header';
import Projects from './components/Projects';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import FluidAnimation from 'react-fluid-animation';
import defaultConfig from './components/FluidAnimationdefaultConfig';
import FluidAnimationStrings from './components/FluidAnimationTextStrings'
import LePetitPrinceBoyAndFox from './components/LePetitPrinceAndFox';
import PrinceMoon from './components/Littleprince';

export default class App extends Component {
  state = {
    config: {
      ...defaultConfig
    }
  }

  render () {
    const {
      config
    } = this.state

    return (
      <Switch>
      <div
        style={{
          height: '100vh'
        }}
      >
        <Navbar />
        <Route exact path="/">
        <FluidAnimation
          config={config}
          animationRef={this._animationRef}
        />
        <FluidAnimationStrings />
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
    )
  }
}

