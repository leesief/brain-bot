import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import logo from './tiger.jpg'

function Logo() {
    return (

        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner"><img style={{paddingTop: '55px'}} alt='cheetah' src={logo} /></div>
            </Tilt>
        </div>

    );
}

export default Logo;