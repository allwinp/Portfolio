import './App.css';
import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Homer from './components/Homer';
import Header from './components/Header';
import FluidAnimation from 'react-fluid-animation'

const defaultConfig = {
  textureDownsample: 1,
  densityDissipation: 0.98,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 25,
  curl: 30,
  splatRadius: 0.005,
}

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
      <div
        style={{
          height: '100vh'
        }}
      >
        <Navbar />
        <FluidAnimation
          config={config}
          animationRef={this._animationRef}
        />

        <div
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
            Allwin Philip
          </h1>
        </div>
      </div>
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

