import React from 'react';
import Typing from 'react-typing-animation';

let strings = ['Allwin Philip', 'React & Django', 'Beautifully Styled', 'Responsive UI']

const FluidAnimationStrings = () => {
    return (
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
            <span>{strings[0]}</span>
            <Typing.Backspace delay={1000} count={strings[0].length + 1} />
            <span>{strings[1]}</span>
            <Typing.Backspace delay={1000} count={strings[1].length + 1} />
            <span>{strings[2]}</span>
            <Typing.Backspace delay={1000} count={strings[2].length + 1} />
            <span>{strings[3]}</span>
            <Typing.Backspace delay={1000} count={strings[3].length + 1} />
          </Typing>
        </h1>
        </div>    )
}

export default FluidAnimationStrings
