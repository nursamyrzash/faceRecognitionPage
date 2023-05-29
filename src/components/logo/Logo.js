import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import r2d2 from "./r2d2.png"


const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{max : 55}} style={{ height: '150px', width:'150px'}}>
                    <div className='Tilt-inner pa3'>
                        <img style={{paddingTop: '5px'}} alt='logo'src={r2d2}/>
                    </div>
            </Tilt>
        </div>
    );
}

export default Logo;