import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Homer from './components/Homer';
import Header from './components/Header';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import FluidAnimation from 'react-fluid-animation';
import defaultConfig from './components/FluidAnimationdefaultConfig';
import Typing from 'react-typing-animation';
import FluidAnimationStrings from './components/FluidAnimationTextStrings'

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
      <HashRouter >
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

        <div className="FluidAnimationText"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#3832e2',
            fontFamily: 'Verdana, "Helvetica Neue", sans-serif',
            pointerEvents: 'none'
          }}
        >
          <h1
            style={{
              fontSize: '5em',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Typing speed={10} loop="true">
              <span>{FluidAnimationStrings[0]}</span>
              <Typing.Backspace delay={1000} count={FluidAnimationStrings[0].length + 1} />
              <span>{FluidAnimationStrings[1]}</span>
              <Typing.Backspace delay={1000} count={FluidAnimationStrings[1].length + 1} />
              <span>{FluidAnimationStrings[2]}</span>
              <Typing.Backspace delay={1000} count={FluidAnimationStrings[2].length + 1} />
              <span>{FluidAnimationStrings[3]}</span>
              <Typing.Backspace delay={1000} count={FluidAnimationStrings[3].length + 1} />
            </Typing>
          </h1>
        </div>
        </Route>
        <Route exact path="/about">
          <Header />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/services">
          <Services />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>

      </div>
      </HashRouter>
      </Switch>
    )
  }

  _animationRef = (ref) => {
    this._animation = ref
  }

  _onUpdate = (config) => {
    this.setState({ config })
  }

  _onClickRandomSplats = () => {
    this._animation.addSplats(5 + Math.random() * 20 | 0)
  }

  _onReset = () => {
    this.setState({ config: { ...defaultConfig } })
  }
}

