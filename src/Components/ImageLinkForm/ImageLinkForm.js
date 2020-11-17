import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f4'>{'This face of pic'}</p>

            <div className='center'>
                <div className=' form center pa4 br3 shadow-3'>
                    <input className= 'f4 w-70 center pa2'onChange={onInputChange} />
                    <button className='f4 ph3 grow dib w-30 pv2 link 
                    bg-light-purple white pointer' onClick= {onButtonSubmit}>Capture</button>       
                </div>
            </div>
                
        </div>
    )
}

export default ImageLinkForm; 