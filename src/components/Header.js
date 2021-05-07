import React from 'react'
import { AnimateOnChange } from 'react-animation'

const Header = () => {
    return (
     <div className="header-wrapper">
         <div className="main-info">
             <AnimateOnChange>
                 Hello
             </AnimateOnChange>
         </div>
     </div>
    )
}

export default Header
